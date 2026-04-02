import db from "../config/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

export const getEsportes = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM esportes ORDER BY data_evento DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar esportes", detalhe: error.message });
  }
};

export const createEsporte = async (req, res) => {
  try {
    const { titulo, modalidade, resumo, medalha, data_evento } = req.body;
    if (!titulo || !modalidade || !data_evento) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando." });
    }
    const foto_url = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await db.query(
      `INSERT INTO esportes (titulo, modalidade, resumo, medalha, data_evento, foto_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [titulo, modalidade, resumo ?? null, medalha ?? "participacao", data_evento, foto_url]
    );
    res.status(201).json({ mensagem: "Esporte cadastrado!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar esporte", detalhe: error.message });
  }
};

export const deleteEsporte = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM esportes WHERE id = ?", [id]);
    res.json({ mensagem: "Esporte removido!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover esporte", detalhe: error.message });
  }
};