import { useState, useEffect } from "react";
import { getLivros, createLivro, updateLivro, deleteLivro } from "../../services/livrosService";
import { CATEGORIAS } from "../../data/categorias";
import styles from "./AdminLivros.module.css";

export default function AdminLivros() {
  const [livros, setLivros] = useState([]);
  const [form, setForm] = useState({
    titulo: "", autor: "", categoria: "Literatura", disponivel: true,
  });

  const carregar = () => getLivros().then((r) => setLivros(r.data));
  useEffect(() => { carregar(); }, []);

  const handleCreate = async () => {
    if (!form.titulo || !form.autor) return;
    await createLivro(form);
    setForm({ titulo: "", autor: "", categoria: "Literatura", disponivel: true });
    carregar();
  };

  const handleToggleDisponivel = async (id, disponivel) => {
    await updateLivro(id, { disponivel: !Boolean(disponivel) });
    carregar();
  };

  const handleDelete = async (id) => {
    if (!confirm("Remover este livro?")) return;
    await deleteLivro(id);
    carregar();
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>📚 Livros</h3>

      <div className={styles.formCard}>
        <p className={styles.formLabel}>Adicionar novo livro</p>
        <div className={styles.formGrid}>
          <input
            className={styles.input}
            placeholder="Título *"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />
          <input
            className={styles.input}
            placeholder="Autor *"
            value={form.autor}
            onChange={(e) => setForm({ ...form, autor: e.target.value })}
          />

          <select
            className={styles.input}
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className={styles.input}
            value={form.disponivel}
            onChange={(e) => setForm({ ...form, disponivel: e.target.value === "true" })}
          >
            <option value="true">Disponível</option>
            <option value="false">Emprestado</option>
          </select>
        </div>
        <button className={styles.btnAdd} onClick={handleCreate}>
          + Adicionar Livro
        </button>
      </div>

      {/* Tabela */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((l) => {
              const disponivel = Boolean(l.disponivel);
              return (
                <tr key={l.id}>
                  <td className={styles.tdTitle}>{l.titulo}</td>
                  <td className={styles.tdMeta}>{l.autor}</td>
                  <td className={styles.tdMeta}>{l.categoria}</td>
                  <td>
                    <button
                      className={`${styles.toggleBtn} ${disponivel ? styles.disponivel : styles.emprestado}`}
                      onClick={() => handleToggleDisponivel(l.id, l.disponivel)}
                      title="Clique para alternar status"
                    >
                      {disponivel ? "✓ Disponível" : "✗ Emprestado"}
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles.btnDelete}
                      onClick={() => handleDelete(l.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}