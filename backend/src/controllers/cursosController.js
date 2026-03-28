import db from "../config/db.js";

export const getCursos = async (req, res) => {
  try {
    const [cursos] = await db.query("SELECT * FROM cursos");

    const cursosComProfessores = await Promise.all(
      cursos.map(async (curso) => {
        const [professores] = await db.query(
          "SELECT * FROM professores WHERE curso_id = ?", [curso.id]
        );
        return { ...curso, professores };
      })
    );

    res.json(cursosComProfessores);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar cursos", detalhe: error.message });
  }
};

export const getCursoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [cursos] = await db.query("SELECT * FROM cursos WHERE id = ?", [id]);

    if (cursos.length === 0) {
      return res.status(404).json({ erro: "Curso não encontrado" });
    }

    const [professores] = await db.query(
      "SELECT * FROM professores WHERE curso_id = ?", [id]
    );

    res.json({ ...cursos[0], professores });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar curso", detalhe: error.message });
  }
};