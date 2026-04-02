import { useState, useEffect, useRef } from "react";
import { getEsportes, createEsporte, deleteEsporte } from "../../services/esportesService";
import styles from "./AdminEsportes.module.css";

const API_URL = "http://localhost:3000";

export default function AdminEsportes() {
  const [esportes, setEsportes] = useState([]);
  const [form, setForm] = useState({
    titulo: "", modalidade: "", resumo: "", medalha: "participacao", data_evento: "",
  });
  const [foto, setFoto]         = useState(null);
  const [preview, setPreview]   = useState(null);
  const fileRef                 = useRef();

  const carregar = () => getEsportes().then((r) => setEsportes(r.data));
  useEffect(() => { carregar(); }, []);

  const handleCreate = async () => {
    if (!form.titulo || !form.modalidade || !form.data_evento) return;
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (foto) formData.append("foto", foto);
    await createEsporte(formData);
    setForm({ titulo: "", modalidade: "", resumo: "", medalha: "participacao", data_evento: "" });
    setFoto(null); setPreview(null);
    carregar();
  };

  const handleDelete = async (id) => {
    if (!confirm("Remover?")) return;
    await deleteEsporte(id);
    carregar();
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>🏆 Esportes</h3>

      <div className={styles.formCard}>
        <p className={styles.formLabel}>Adicionar conquista</p>
        <div className={styles.formGrid}>
          <input className={styles.input} placeholder="Título *"
            value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
          <input className={styles.input} placeholder="Modalidade *"
            value={form.modalidade} onChange={(e) => setForm({ ...form, modalidade: e.target.value })} />
          <select className={styles.input}
            value={form.medalha} onChange={(e) => setForm({ ...form, medalha: e.target.value })}>
            <option value="ouro">🥇 Ouro</option>
            <option value="prata">🥈 Prata</option>
            <option value="bronze">🥉 Bronze</option>
            <option value="participacao">🏅 Participação</option>
          </select>
          <input className={styles.input} type="date"
            value={form.data_evento} onChange={(e) => setForm({ ...form, data_evento: e.target.value })} />
          <input className={styles.input} placeholder="Resumo"
            value={form.resumo} onChange={(e) => setForm({ ...form, resumo: e.target.value })} />
          <div className={styles.uploadArea}>
            <input ref={fileRef} type="file" accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files[0]; if (f) { setFoto(f); setPreview(URL.createObjectURL(f)); }}} />
            <label onClick={() => fileRef.current.click()} className={styles.fileLabel}>
              {preview ? "🖼️ Trocar foto" : "📷 Foto (opcional)"}
            </label>
            {preview && <img src={preview} className={styles.preview} alt="preview" />}
          </div>
        </div>
        <button className={styles.btnAdd} onClick={handleCreate}>+ Adicionar</button>
      </div>

      <div className={styles.list}>
        {esportes.map((e) => (
          <div key={e.id} className={styles.item}>
            {e.foto_url
              ? <img src={`${API_URL}${e.foto_url}`} className={styles.itemFoto} alt={e.titulo} />
              : <div className={styles.itemIcon}>🏅</div>
            }
            <div className={styles.itemInfo}>
              <p className={styles.itemTitle}>{e.titulo}</p>
              <p className={styles.itemMeta}>{e.modalidade} · {e.data_evento?.slice(0,10)}</p>
            </div>
            <button className={styles.btnDelete} onClick={() => handleDelete(e.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}