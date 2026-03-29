import db from "../config/db.js";

export const getStats = async (req, res) => {
  try {
    const [[{ totalLivros }]]        = await db.query("SELECT COUNT(*) as totalLivros FROM livros");
    const [[{ livrosDisponiveis }]]  = await db.query("SELECT COUNT(*) as livrosDisponiveis FROM livros WHERE disponivel = true");
    const [[{ totalAchados }]]       = await db.query("SELECT COUNT(*) as totalAchados FROM achados_perdidos");
    const [[{ achadosPendentes }]]   = await db.query("SELECT COUNT(*) as achadosPendentes FROM achados_perdidos WHERE retirado = false");
    const [[{ totalAvisos }]]        = await db.query("SELECT COUNT(*) as totalAvisos FROM avisos");
    const [[{ totalCursos }]]        = await db.query("SELECT COUNT(*) as totalCursos FROM cursos");
    const [[{ totalProfessores }]]   = await db.query("SELECT COUNT(*) as totalProfessores FROM professores");

    res.json({
      livros:       { total: totalLivros, disponiveis: livrosDisponiveis },
      achados:      { total: totalAchados, pendentes: achadosPendentes },
      avisos:       { total: totalAvisos },
      cursos:       { total: totalCursos, professores: totalProfessores },
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar estatísticas", detalhe: error.message });
  }
};