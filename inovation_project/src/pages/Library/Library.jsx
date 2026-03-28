import { useState, useEffect } from "react";
import styles from "./Library.module.css";
import BookCard from "../../components/BookCard/BookCard";
import { getLivros } from "../../services/livrosService";

export default function Library() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getLivros()
      .then((res) => setLivros(res.data))
      .catch(() => setErro("Erro ao carregar livros."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = livros.filter((b) =>
    b.titulo.toLowerCase().includes(search.toLowerCase()) ||
    b.autor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="page-title">📚 Biblioteca</h2>
      <p className="page-subtitle">
        Consulte o acervo de livros e materiais pedagógicos disponíveis.
      </p>

      <input
        className={styles.searchInput}
        placeholder="Buscar por título ou autor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p className="page-subtitle">Carregando...</p>}
      {erro    && <p style={{ color: "red" }}>{erro}</p>}

      {filtered.length === 0 && !loading ? (
        <p className={styles.empty}>Nenhum livro encontrado.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}