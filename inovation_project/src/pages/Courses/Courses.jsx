import { useState, useEffect } from "react";
import styles from "./Courses.module.css";
import ProfessorCard from "../../components/ProfessorCard/ProfessorCard";
import { getCursos } from "../../services/cursosService";

export default function Courses() {
  const [cursos, setCursos] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    getCursos()
      .then((res) => {
        setCursos(res.data);
        setActiveId(res.data[0]?.id ?? null);
      })
      .catch(() => setErro("Erro ao carregar cursos."))
      .finally(() => setLoading(false));
  }, []);

  const curso = cursos.find((c) => c.id === activeId);

  return (
    <div>
      <h2 className="page-title">🎓 Cursos Técnicos</h2>
      <p className="page-subtitle">
        Conheça os cursos técnicos oferecidos pela instituição.
      </p>

      {loading && <p className="page-subtitle">Carregando...</p>}
      {erro    && <p style={{ color: "red" }}>{erro}</p>}

      <div className={styles.tabs}>
        {cursos.map((c) => (
          <button
            key={c.id}
            className={`${styles.tabBtn} ${activeId === c.id ? styles.active : ""}`}
            style={activeId === c.id ? { background: c.cor, borderColor: c.cor } : {}}
            onClick={() => setActiveId(c.id)}
          >
            {c.sigla} — {c.nome.split(" ").slice(2).join(" ")}
          </button>
        ))}
      </div>

      {curso && (
        <>
          <div className={styles.courseBanner} style={{ background: curso.cor }}>
            <p className={styles.courseBannerEyebrow}>Curso Técnico</p>
            <h3 className={styles.courseBannerTitle}>{curso.nome}</h3>
            <p className={styles.courseBannerDesc}>{curso.descricao}</p>
          </div>

          <h4 className={styles.docenteTitle}>Corpo Docente</h4>
          <div className={styles.docenteGrid}>
            {curso.professores.map((prof, i) => (
              <ProfessorCard key={i} professor={prof} cor={curso.cor} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}