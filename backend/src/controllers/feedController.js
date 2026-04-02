import db from "../config/db.js";

export const getFeed = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const [avisos] = await db.query(
      `SELECT id, titulo, descricao, tipo, data_evento as data,
              NULL as foto_url, NULL as sala, NULL as curso,
              NULL as habilidades, NULL as modalidade, NULL as medalha,
              criado_em, 'aviso' as tipo_feed
       FROM avisos ORDER BY criado_em DESC LIMIT 6`
    );

    const [achados] = await db.query(
      `SELECT id, descricao as titulo, NULL as descricao, NULL as tipo,
              NULL as data, foto_url, sala, NULL as curso,
              NULL as habilidades, NULL as modalidade, NULL as medalha,
              criado_em, 'achado' as tipo_feed
       FROM achados_perdidos WHERE retirado = false
       ORDER BY criado_em DESC LIMIT 4`
    );

    const [talentos] = await db.query(
      `SELECT id, nome as titulo, bio as descricao, NULL as tipo,
              NULL as data, foto_url, NULL as sala, curso,
              habilidades, NULL as modalidade, NULL as medalha,
              criado_em, 'talento' as tipo_feed
       FROM talentos WHERE status = 'aprovado'
       ORDER BY criado_em DESC LIMIT 4`
    );

    const [livros] = await db.query(
      `SELECT id, titulo, autor as descricao, NULL as tipo,
              NULL as data, NULL as foto_url, NULL as sala, NULL as curso,
              NULL as habilidades, categoria as modalidade, NULL as medalha,
              criado_em, 'livro' as tipo_feed
       FROM livros ORDER BY criado_em DESC LIMIT 4`
    );

    const [esportes] = await db.query(
      `SELECT id, titulo, resumo as descricao, NULL as tipo,
              data_evento as data, foto_url, NULL as sala, NULL as curso,
              NULL as habilidades, modalidade, medalha,
              criado_em, 'esporte' as tipo_feed
       FROM esportes ORDER BY criado_em DESC LIMIT 4`
    );

    const feed = [...avisos, ...achados, ...talentos, ...livros, ...esportes]
      .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));

    const paginado = feed.slice(offset, offset + Number(limit));

    res.json({
      items:   paginado,
      total:   feed.length,
      page:    Number(page),
      hasMore: offset + Number(limit) < feed.length,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar feed", detalhe: error.message });
  }
};