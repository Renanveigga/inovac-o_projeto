import db from "../config/db.js";

export const getLivros = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM livros ORDER BY titulo ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar livros", detalhe: error.message });
  }
};

export const getLivroById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM livros WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar livro", detalhe: error.message });
  }
};

export const createLivro = async (req, res) => {
  try {
    const { titulo, autor, categoria, disponivel } = req.body;
    const [result] = await db.query(
      "INSERT INTO livros (titulo, autor, categoria, disponivel) VALUES (?, ?, ?, ?)",
      [titulo, autor, categoria, disponivel ?? true]
    );
    res.status(201).json({ mensagem: "Livro cadastrado!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar livro", detalhe: error.message });
  }
};

export const updateLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const { disponivel } = req.body;
    await db.query("UPDATE livros SET disponivel = ? WHERE id = ?", [disponivel, id]);
    res.json({ mensagem: "Livro atualizado!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar livro", detalhe: error.message });
  }
};

export const deleteLivro = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM livros WHERE id = ?", [id]);
    res.json({ mensagem: "Livro removido!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover livro", detalhe: error.message });
  }
};