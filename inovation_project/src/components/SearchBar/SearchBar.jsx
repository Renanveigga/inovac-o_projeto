import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { buscar } from "../../services/buscaService";
import styles from "./SearchBar.module.css";

const TIPO_COLORS = {
  evento:   "#2E86C1",
  prova:    "#C0392B",
  feriado:  "#8E44AD",
  palestra: "#1E8449",
};

export default function SearchBar() {
  const [query, setQuery]       = useState("");
  const [results, setResults]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [aberto, setAberto]     = useState(false);
  const navigate                = useNavigate();
  const wrapperRef              = useRef();
  const timerRef                = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setAberto(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounce — espera 400ms após parar de digitar
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults(null);
      setAberto(false);
      return;
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await buscar(query);
        setResults(res.data);
        setAberto(true);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  const total = results
    ? results.avisos.length + results.livros.length + results.achados.length
    : 0;

  const handleNavegar = (rota) => {
    setAberto(false);
    setQuery("");
    navigate(rota);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.inputBox}>
        <span className={styles.icon}>🔍</span>
        <input
          className={styles.input}
          placeholder="Buscar livros, avisos, achados..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results && setAberto(true)}
        />
        {loading && <span className={styles.spinner}>⏳</span>}
        {query && (
          <button className={styles.clear} onClick={() => { setQuery(""); setResults(null); }}>
            ✕
          </button>
        )}
      </div>

      {aberto && results && (
        <div className={styles.dropdown}>
          {total === 0 ? (
            <p className={styles.empty}>Nenhum resultado para "{query}"</p>
          ) : (
            <>

              {results.avisos.length > 0 && (
                <div className={styles.group}>
                  <p className={styles.groupLabel}>📋 Avisos</p>
                  {results.avisos.map((a) => (
                    <button
                      key={a.id}
                      className={styles.resultItem}
                      onClick={() => handleNavegar("/")}
                    >
                      <span
                        className={styles.badge}
                        style={{ background: TIPO_COLORS[a.tipo] ?? "#888" }}
                      >
                        {a.tipo}
                      </span>
                      <span className={styles.resultTitle}>{a.titulo}</span>
                    </button>
                  ))}
                </div>
              )}

              {results.livros.length > 0 && (
                <div className={styles.group}>
                  <p className={styles.groupLabel}>📚 Biblioteca</p>
                  {results.livros.map((l) => (
                    <button
                      key={l.id}
                      className={styles.resultItem}
                      onClick={() => handleNavegar("/biblioteca")}
                    >
                      <span className={`${styles.badge} ${l.disponivel ? styles.disp : styles.emp}`}>
                        {l.disponivel ? "Disponível" : "Emprestado"}
                      </span>
                      <div className={styles.resultInfo}>
                        <span className={styles.resultTitle}>{l.titulo}</span>
                        <span className={styles.resultSub}>{l.autor}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {results.achados.length > 0 && (
                <div className={styles.group}>
                  <p className={styles.groupLabel}>🔍 Achados e Perdidos</p>
                  {results.achados.map((a) => (
                    <button
                      key={a.id}
                      className={styles.resultItem}
                      onClick={() => handleNavegar("/achados")}
                    >
                      <span className={`${styles.badge} ${a.retirado ? styles.emp : styles.disp}`}>
                        {a.retirado ? "Retirado" : "Aguardando"}
                      </span>
                      <div className={styles.resultInfo}>
                        <span className={styles.resultTitle}>{a.descricao}</span>
                        <span className={styles.resultSub}>📍 {a.sala}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}