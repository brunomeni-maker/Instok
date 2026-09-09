const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("."));

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
