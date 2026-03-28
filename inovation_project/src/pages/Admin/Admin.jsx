import { useState } from "react";
import styles from "./Admin.module.css";
import AdminAvisos  from "../../components/AdminAvisos/AdminAvisos";
import AdminLivros  from "../../components/AdminLivros/AdminLivros";
import AdminAchados from "../../components/AdminAchados/AdminAchados";

const TABS = [
  { id: "avisos",  label: "📋 Avisos"            },
  { id: "livros",  label: "📚 Livros"             },
  { id: "achados", label: "🔍 Achados e Perdidos"  },
];

export default function Admin({ onLogout }) {
  const [tab, setTab] = useState("avisos");

  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    onLogout();
  };

  return (
    <div className={styles.adminLayout}>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>⚙️</div>
          <span className={styles.headerTitle}>Painel Administrativo</span>
        </div>
        <button className={styles.btnLogout} onClick={handleLogout}>
          Sair
        </button>
      </header>

      {/* Tabs */}
      <div className={styles.tabsBar}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`${styles.tab} ${tab === t.id ? styles.activeTab : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className={styles.body}>
        <div className={styles.contentCard}>
          {tab === "avisos"  && <AdminAvisos  />}
          {tab === "livros"  && <AdminLivros  />}
          {tab === "achados" && <AdminAchados />}
        </div>
      </div>

    </div>
  );
}