import db from "../config/db.js";

export const getAvisos = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM avisos ORDER BY data_evento ASC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar avisos", detalhe: error.message });
  }
};

export const getAvisoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM avisos WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Aviso não encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar aviso", detalhe: error.message });
  }
};

export const createAviso = async (req, res) => {
  try {
    const { titulo, descricao, tipo, data_evento } = req.body;
    const [result] = await db.query(
      "INSERT INTO avisos (titulo, descricao, tipo, data_evento) VALUES (?, ?, ?, ?)",
      [titulo, descricao, tipo, data_evento]
    );
    res.status(201).json({ mensagem: "Aviso criado!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar aviso", detalhe: error.message });
  }
};

export const deleteAviso = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM avisos WHERE id = ?", [id]);
    res.json({ mensagem: "Aviso removido!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover aviso", detalhe: error.message });
  }
};