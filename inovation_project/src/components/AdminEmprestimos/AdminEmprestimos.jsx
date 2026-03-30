import { useState, useEffect } from "react";
import { getEmprestimos, createEmprestimo, devolverLivro, deleteEmprestimo } from "../../services/emprestimosService";
import { getLivros } from "../../services/livrosService";
import styles from "./AdminEmprestimos.module.css";

export default function AdminEmprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [livros, setLivros]           = useState([]);
  const [filtro, setFiltro]           = useState("todos");
  const [form, setForm]               = useState({
    livro_id: "", nome_aluno: "", turma: "", data_devolucao: "",
  });

  const carregar = () => getEmprestimos().then((r) => setEmprestimos(r.data));

  useEffect(() => {
    carregar();
    getLivros().then((r) =>
      setLivros(r.data)
    );
  }, []);

  const handleCreate = async () => {
    if (!form.livro_id || !form.nome_aluno) return;
    await createEmprestimo(form);
    setForm({ livro_id: "", nome_aluno: "", turma: "", data_devolucao: "" });
    carregar();
    getLivros().then((r) => setLivros(r.data));
  };

  const handleDevolver = async (id) => {
    await devolverLivro(id);
    carregar();
  };

  const handleDelete = async (id) => {
    if (!confirm("Remover este registro?")) return;
    await deleteEmprestimo(id);
    carregar();
  };

  const filtrados = emprestimos.filter((e) => {
    if (filtro === "ativos")     return !e.devolvido;
    if (filtro === "devolvidos") return e.devolvido;
    return true;
  });

  const livrosDisponiveis = livros.filter((l) => Boolean(l.disponivel));

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>📖 Histórico de Empréstimos</h3>

      {/* Formulário */}
      <div className={styles.formCard}>
        <p className={styles.formLabel}>Registrar novo empréstimo</p>
        <div className={styles.formGrid}>

          <select
            className={styles.input}
            value={form.livro_id}
            onChange={(e) => setForm({ ...form, livro_id: e.target.value })}
          >
            <option value="">Selecione o livro *</option>
            {livrosDisponiveis.map((l) => (
              <option key={l.id} value={l.id}>{l.titulo}</option>
            ))}
          </select>

          <input
            className={styles.input}
            placeholder="Nome do aluno *"
            value={form.nome_aluno}
            onChange={(e) => setForm({ ...form, nome_aluno: e.target.value })}
          />

          <input
            className={styles.input}
            placeholder="Turma (ex: 1º TI)"
            value={form.turma}
            onChange={(e) => setForm({ ...form, turma: e.target.value })}
          />

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Data de devolução prevista</label>
            <input
              className={styles.input}
              type="date"
              value={form.data_devolucao}
              onChange={(e) => setForm({ ...form, data_devolucao: e.target.value })}
            />
          </div>

        </div>
        <button className={styles.btnAdd} onClick={handleCreate}>
          + Registrar Empréstimo
        </button>
      </div>

      <div className={styles.filtros}>
        {[
          { value: "todos",      label: "Todos"       },
          { value: "ativos",     label: "Em aberto"   },
          { value: "devolvidos", label: "Devolvidos"  },
        ].map((f) => (
          <button
            key={f.value}
            className={`${styles.filtroBtn} ${filtro === f.value ? styles.filtroBtnActive : ""}`}
            onClick={() => setFiltro(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Livro</th>
              <th>Aluno</th>
              <th>Turma</th>
              <th>Empréstimo</th>
              <th>Devolução</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((e) => (
              <tr key={e.id}>
                <td className={styles.tdTitle}>{e.livro_titulo}</td>
                <td className={styles.tdMeta}>{e.nome_aluno}</td>
                <td className={styles.tdMeta}>{e.turma ?? "—"}</td>
                <td className={styles.tdMeta}>{e.data_emprestimo?.slice(0, 10)}</td>
                <td className={styles.tdMeta}>{e.data_devolucao?.slice(0, 10) ?? "—"}</td>
                <td>
                  <span className={`${styles.status} ${e.devolvido ? styles.devolvido : styles.ativo}`}>
                    {e.devolvido ? "Devolvido" : "Em aberto"}
                  </span>
                </td>
                <td>
                  <div className={styles.acoes}>
                    {!e.devolvido && (
                      <button className={styles.btnDevolver} onClick={() => handleDevolver(e.id)}>
                        Devolver
                      </button>
                    )}
                    <button className={styles.btnDelete} onClick={() => handleDelete(e.id)}>
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.empty}>Nenhum registro encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}