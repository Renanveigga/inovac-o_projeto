import { useState, useEffect, useRef } from "react";
import { getAchados, createAchado, updateAchado, deleteAchado } from "../../services/achadosService";
import styles from "./AdminAchados.module.css";

export default function AdminAchados() {
  const [achados, setAchados] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [sala, setSala] = useState("");
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  const carregar = () => getAchados().then((r) => setAchados(r.data));

  useEffect(() => { carregar(); }, []);

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCreate = async () => {
    if (!descricao || !sala) return;

    const formData = new FormData();
    formData.append("descricao", descricao);
    formData.append("sala", sala);
    if (foto) formData.append("foto", foto);

    await createAchado(formData);
    setDescricao("");
    setSala("");
    setFoto(null);
    setPreview(null);
    fileRef.current.value = "";
    carregar();
  };

  const handleRetirado = async (id, retirado) => {
    await updateAchado(id, { retirado: !retirado });
    carregar();
  };

  const handleDelete = async (id) => {
    if (!confirm("Remover este item?")) return;
    await deleteAchado(id);
    carregar();
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>🔍 Achados e Perdidos</h3>

      <div className={styles.formCard}>
        <p className={styles.formLabel}>Cadastrar novo item</p>
        <div className={styles.formGrid}>
          <input
            className={styles.input}
            placeholder="Descrição do item *"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Sala (ex: Coord. 01) *"
            value={sala}
            onChange={(e) => setSala(e.target.value)}
          />
        </div>

        <div className={styles.uploadArea}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFoto}
            className={styles.fileInput}
            id="fotoInput"
          />
          <label htmlFor="fotoInput" className={styles.fileLabel}>
            {preview ? "🖼️ Trocar foto" : "📷 Adicionar foto (opcional)"}
          </label>
          {preview && (
            <img src={preview} alt="preview" className={styles.preview} />
          )}
        </div>

        <button className={styles.btnAdd} onClick={handleCreate}>
          + Cadastrar Item
        </button>
      </div>

      <div className={styles.list}>
        {achados.map((a) => (
          <div key={a.id} className={styles.item}>

            <div className={styles.itemFoto}>
              {a.foto_url ? (
                <img
                  src={`http://localhost:3000${a.foto_url}`}
                  alt={a.descricao}
                  className={styles.foto}
                />
              ) : (
                <div className={styles.semFoto}>📦</div>
              )}
            </div>

            <div className={styles.itemInfo}>
              <p className={styles.itemTitle}>{a.descricao}</p>
              <p className={styles.itemMeta}>📍 {a.sala}</p>
            </div>

            <div className={styles.itemActions}>
              <button
                className={`${styles.btnStatus} ${a.retirado ? styles.retirado : styles.pendente}`}
                onClick={() => handleRetirado(a.id, a.retirado)}
              >
                {a.retirado ? "Retirado" : "Marcar retirado"}
              </button>
              <button className={styles.btnDelete} onClick={() => handleDelete(a.id)}>
                Excluir
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}