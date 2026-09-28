const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use((req, res, next) => {
  console.log("REQUISICAO:", req.method, req.originalUrl);
  next();
});

app.use(express.json());
app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(
`User-agent: *
Allow: /

Sitemap: https://instok-ji72.onrender.com/sitemap.xml`
  );
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml").send(
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://instok-ji72.onrender.com/</loc>
  </url>
</urlset>`
  );
});

app.get("/llms.txt", (req, res) => {
  res.type("text/plain").send(
`# Instok

Instok é uma aplicação que ajuda usuários a encontrar produtos disponíveis em lojas físicas próximas.

## Funcionalidades

- Pesquisa de produtos
- Identificação de lojas com disponibilidade
- Comparação de distância entre lojas
- Visualização de preço e endereço
- Busca interpretada com inteligência artificial
- Login com Google
- Pagamento online

## Site

https://instok-ji72.onrender.com/`
  );
});
app.use(express.static("."));
app.get("/api/clerk-key", (req, res) => {
  res.json({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY
  });
});
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/interpretar-busca", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        error: "Digite uma busca."
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: `
Você ajuda o aplicativo Instok a entender buscas de produtos.

Extraia os dados da frase do usuário e responda somente em JSON válido.

Formato:
{
  "produto": "",
  "marca": "",
  "categoria": "",
  "preco_max": null
}

Busca do usuário:
${query}
      `
    });

    const text = response.output_text;

    const parsed = JSON.parse(text);

    res.json(parsed);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Não foi possível processar a busca com IA."
    });
  }
});
// ==========================================
// BUSCAR LOJAS REAIS PRÓXIMAS
// OpenStreetMap + Overpass
// ==========================================

app.get("/api/lojas-proximas", async (req, res) => {
  try {
    const { lat, lon, produto } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        error: "Localização não informada."
      });
    }

    const busca = (produto || "").toLowerCase();

let tipos = [
  '["shop"="electronics"]',
  '["shop"="computer"]',
  '["shop"="mobile_phone"]',
  '["shop"="department_store"]',
  '["shop"="appliance"]'
];

    if (
      busca.includes("tenis") ||
      busca.includes("tênis") ||
      busca.includes("nike") ||
      busca.includes("corrida")
    ) {
      tipos = [
        '["shop"="sports"]',
        '["shop"="shoes"]'
      ];
    }

    if (
      busca.includes("mochila") ||
      busca.includes("bolsa")
    ) {
      tipos = [
        '["shop"="bag"]',
        '["shop"="department_store"]'
      ];
    }

   const raio = 15000;

    const consultas = tipos.map(tipo => `
      node(around:${raio},${lat},${lon})${tipo};
      way(around:${raio},${lat},${lon})${tipo};
      relation(around:${raio},${lat},${lon})${tipo};
    `).join("");

    const query = `
      [out:json][timeout:25];
      (
        ${consultas}
      );
      out center tags;
    `;

  const overpassServers = [
  "https://overpass.private.coffee/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass-api.de/api/interpreter"
];

let data = null;
let lastError = null;

for (const server of overpassServers) {

  try {

    console.log(
      "Tentando Overpass:",
      server
    );

    const response = await fetch(
      server,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body:
          "data=" +
          encodeURIComponent(query),

        signal:
          AbortSignal.timeout(15000)
      }
    );

    if (!response.ok) {
      throw new Error(
        "HTTP " + response.status
      );
    }

    data = await response.json();

    console.log(
      "Overpass funcionando:",
      server
    );

    break;

  } catch (error) {

    console.error(
      "Falha no Overpass:",
      server,
      error.message
    );

    lastError = error;
  }
}

if (!data) {
  throw lastError ||
    new Error(
      "Nenhum servidor do OpenStreetMap respondeu."
    );
}

    const lojas = data.elements
      .map(item => {
        const latitude =
          item.lat || item.center?.lat;

        const longitude =
          item.lon || item.center?.lon;

        if (
          !latitude ||
          !longitude ||
          !item.tags?.name
        ) {
          return null;
        }

        const endereco = [
          item.tags["addr:street"],
          item.tags["addr:housenumber"],
          item.tags["addr:suburb"]
        ]
          .filter(Boolean)
          .join(", ");

        return {
          id: item.id,
          name: item.tags.name,
          address:
            endereco || "Endereço disponível no mapa",
          latitude,
          longitude
        };
      })
      .filter(Boolean)
      .slice(0, 15);

    res.json({ lojas });

  } catch (error) {
    console.error("Erro ao buscar lojas:", error);

    res.status(500).json({
      error: "Não foi possível buscar lojas próximas."
    });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Instok rodando na porta ${PORT}`);
});
