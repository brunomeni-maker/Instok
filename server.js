const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

app.use(express.json());
app.get("/robots.txt", (req, res) => {
app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(
`User-agent: *
Allow: /

Sitemap: https://instok-jj72.onrender.com/sitemap.xml`
  );
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml").send(
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://instok-jj72.onrender.com/</loc>
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

https://instok-jj72.onrender.com/`
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Instok rodando na porta ${PORT}`);
});
