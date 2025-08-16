import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Rota de teste: inserir viagem
app.post("/viagem", async (req, res) => {
  const { nome, planeta } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO viagens (nome, planeta) VALUES ($1, $2) RETURNING id",
      [nome, planeta]
    );
    res.json({ mensagem: `Boa viagem, ${nome}!`, id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(3000, () => console.log("Backend rodando na porta 3000"));
