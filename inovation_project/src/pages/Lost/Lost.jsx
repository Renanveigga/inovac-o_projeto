import { useState, useEffect } from "react";
import styles from "./Lost.module.css";
import AchadoCard from "../../components/AchadoCard/AchadoCard";
import { getAchados } from "../../services/achadosService";

export default function Lost() {
  const [achados, setAchados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    getAchados()
      .then((res) => setAchados(res.data))
      .catch(() => setErro("Erro ao carregar itens."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="page-title">🔍 Achados e Perdidos</h2>
      <p className="page-subtitle">
        Perdeu algo? Veja os itens encontrados e dirija-se à sala indicada.
      </p>

      {loading && <p className="page-subtitle">Carregando...</p>}
      {erro    && <p style={{ color: "red" }}>{erro}</p>}

      <div className={styles.list}>
        {achados.map((item) => (
          <AchadoCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}