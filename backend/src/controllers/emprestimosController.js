import db from "../config/db.js";

export const getEmprestimos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT e.*, l.titulo as livro_titulo, l.autor as livro_autor
      FROM emprestimos e
      JOIN livros l ON e.livro_id = l.id
      ORDER BY e.data_emprestimo DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar empréstimos", detalhe: error.message });
  }
};

export const createEmprestimo = async (req, res) => {
  try {
    const { livro_id, nome_aluno, turma, data_devolucao } = req.body;

    await db.query(
      "INSERT INTO emprestimos (livro_id, nome_aluno, turma, data_devolucao) VALUES (?, ?, ?, ?)",
      [livro_id, nome_aluno, turma ?? null, data_devolucao ?? null]
    );

    await db.query("UPDATE livros SET disponivel = false WHERE id = ?", [livro_id]);

    res.status(201).json({ mensagem: "Empréstimo registrado!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao registrar empréstimo", detalhe: error.message });
  }
};

export const devolverLivro = async (req, res) => {
  try {
    const { id } = req.params;

    const [[emp]] = await db.query("SELECT livro_id FROM emprestimos WHERE id = ?", [id]);
    if (!emp) return res.status(404).json({ erro: "Empréstimo não encontrado." });

    await db.query(
      "UPDATE emprestimos SET devolvido = true, data_devolucao = CURDATE() WHERE id = ?",
      [id]
    );

    await db.query("UPDATE livros SET disponivel = true WHERE id = ?", [emp.livro_id]);

    res.json({ mensagem: "Livro devolvido!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao devolver livro", detalhe: error.message });
  }
};

export const deleteEmprestimo = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM emprestimos WHERE id = ?", [id]);
    res.json({ mensagem: "Empréstimo removido!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover empréstimo", detalhe: error.message });
  }
};