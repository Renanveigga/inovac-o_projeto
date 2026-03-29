import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Hero from "../../components/Hero/Hero";
import AvisoCard from "../../components/AvisoCard/AvisoCard";
import StatCard from "../../components/StatCard/StatCard";
import { getAvisos } from "../../services/avisosService";
import { getStats } from "../../services/statsService";

export default function Home() {
  const [avisos, setAvisos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAvisos(), getStats()])
      .then(([avisosRes, statsRes]) => {
        setAvisos(avisosRes.data);
        setStats(statsRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Hero />

      {stats && (
        <div className={styles.statsGrid}>
          <StatCard
            icon="📚"
            label="Livros no acervo"
            value={stats.livros.total}
            sub={`${stats.livros.disponiveis} disponíveis`}
            cor="#2E86C1"
          />
          <StatCard
            icon="🔍"
            label="Achados e Perdidos"
            value={stats.achados.total}
            sub={`${stats.achados.pendentes} aguardando retirada`}
            cor="#E67E22"
          />
          <StatCard
            icon="📋"
            label="Avisos publicados"
            value={stats.avisos.total}
            cor="#8E44AD"
          />
          <StatCard
            icon="🎓"
            label="Cursos técnicos"
            value={stats.cursos.total}
            sub={`${stats.cursos.professores} professores`}
            cor="#27AE60"
          />
        </div>
      )}

      <h2 className={styles.sectionTitle}>📋 Quadro de Avisos</h2>
      {loading && <p className="page-subtitle">Carregando...</p>}
      <div className={styles.avisosList}>
        {avisos.map((aviso) => (
          <AvisoCard key={aviso.id} aviso={aviso} />
        ))}
      </div>
    </div>
  );
}