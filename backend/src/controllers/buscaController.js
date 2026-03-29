import db from "../config/db.js";

export const buscar = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.json({ avisos: [], livros: [], achados: [] });
    }

    const termo = `%${q}%`;

    const [avisos] = await db.query(
      `SELECT id, titulo, tipo, data_evento as data
       FROM avisos
       WHERE titulo LIKE ? OR descricao LIKE ?
       LIMIT 5`,
      [termo, termo]
    );

    const [livros] = await db.query(
      `SELECT id, titulo, autor, categoria, disponivel
       FROM livros
       WHERE titulo LIKE ? OR autor LIKE ? OR categoria LIKE ?
       LIMIT 5`,
      [termo, termo, termo]
    );

    const [achados] = await db.query(
      `SELECT id, descricao, sala, retirado
       FROM achados_perdidos
       WHERE descricao LIKE ? OR sala LIKE ?
       LIMIT 5`,
      [termo, termo]
    );

    res.json({ avisos, livros, achados });
  } catch (error) {
    res.status(500).json({ erro: "Erro na busca", detalhe: error.message });
  }
};