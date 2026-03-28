import { useState, useEffect } from "react";
import { getAvisos, createAviso, deleteAviso } from "../../services/avisosService";
import styles from "./AdminAvisos.module.css";

export default function AdminAvisos() {
  const [avisos, setAvisos] = useState([]);
  const [form, setForm] = useState({ titulo: "", descricao: "", tipo: "evento", data_evento: "" });

  const carregar = () => getAvisos().then((r) => setAvisos(r.data));

  useEffect(() => { carregar(); }, []);

  const handleCreate = async () => {
    if (!form.titulo || !form.data_evento) return;
    await createAviso(form);
    setForm({ titulo: "", descricao: "", tipo: "evento", data_evento: "" });
    carregar();
  };

  const handleDelete = async (id) => {
    if (!confirm("Remover este aviso?")) return;
    await deleteAviso(id);
    carregar();
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>📋 Avisos</h3>

      {/* Formulário */}
      <div className={styles.form}>
        <input
          className={styles.input}
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
        />
        <select
          className={styles.input}
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        >
          <option value="evento">Evento</option>
          <option value="prova">Prova</option>
          <option value="feriado">Feriado</option>
          <option value="palestra">Palestra</option>
        </select>
        <input
          className={styles.input}
          type="date"
          value={form.data_evento}
          onChange={(e) => setForm({ ...form, data_evento: e.target.value })}
        />
        <button className={styles.btnAdd} onClick={handleCreate}>
          + Adicionar
        </button>
      </div>

      {/* Lista */}
      <div className={styles.list}>
        {avisos.map((a) => (
          <div key={a.id} className={styles.item}>
            <div>
              <p className={styles.itemTitle}>{a.titulo}</p>
              <p className={styles.itemMeta}>{a.tipo} · {a.data_evento?.slice(0, 10)}</p>
            </div>
            <button className={styles.btnDelete} onClick={() => handleDelete(a.id)}>
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}