import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Hero from "../../components/Hero/Hero";
import AvisoCard from "../../components/AvisoCard/AvisoCard";
import { getAvisos } from "../../services/avisosService";

export default function Home() {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    getAvisos()
      .then((res) => setAvisos(res.data))
      .catch(() => setErro("Erro ao carregar avisos."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Hero />
      <h2 className={styles.sectionTitle}>📋 Quadro de Avisos</h2>

      {loading && <p className="page-subtitle">Carregando...</p>}
      {erro    && <p style={{ color: "red" }}>{erro}</p>}

      <div className={styles.avisosList}>
        {avisos.map((aviso) => (
          <AvisoCard key={aviso.id} aviso={aviso} />
        ))}
      </div>
    </div>
  );
}