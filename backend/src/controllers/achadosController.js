import db from "../config/db.js";

export const getAchados = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM achados_perdidos ORDER BY criado_em DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar achados", detalhe: error.message });
  }
};

export const getAchadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM achados_perdidos WHERE id = ?", [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ erro: "Item não encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar item", detalhe: error.message });
  }
};

export const createAchado = async (req, res) => {
  try {
    const { descricao, sala } = req.body;

    const foto_url = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await db.query(
      "INSERT INTO achados_perdidos (descricao, sala, foto_url) VALUES (?, ?, ?)",
      [descricao, sala, foto_url]
    );
    res.status(201).json({ mensagem: "Item cadastrado!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar item", detalhe: error.message });
  }
};

export const updateAchado = async (req, res) => {
  try {
    const { id } = req.params;
    const { retirado } = req.body;
    await db.query(
      "UPDATE achados_perdidos SET retirado = ? WHERE id = ?", [retirado, id]
    );
    res.json({ mensagem: "Item atualizado!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar item", detalhe: error.message });
  }
};

export const deleteAchado = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM achados_perdidos WHERE id = ?", [id]);
    res.json({ mensagem: "Item removido!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover item", detalhe: error.message });
  }
};