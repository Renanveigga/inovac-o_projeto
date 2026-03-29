import { useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { NAV_ITEMS } from "../../data/Mockdata";

const ROUTE_MAP = {
  home:    "/",
  library: "/biblioteca",
  lost:    "/achados",
  courses: "/cursos",
  history: "/historia",
  admin:   "/admin",
};

export default function Sidebar({ onNavigate, dark, toggleTheme }) {
  const location = useLocation();

  const isActive = (id) => {
    const route = ROUTE_MAP[id];
    if (id === "home") return location.pathname === "/";
    return location.pathname.startsWith(route);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>校</div>
        <p className={styles.logoTitle}>Portal Escolar</p>
        <p className={styles.logoSub}>Colégio Estadual</p>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`${styles.navBtn} ${isActive(item.id) ? styles.active : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className={styles.navIcon}>
                <Icon size={20} />
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className={styles.themeToggle}>
        <span className={styles.themeLabel}>
          {dark ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
        </span>
        <button
          className={`${styles.toggleBtn} ${dark ? styles.toggleDark : ""}`}
          onClick={toggleTheme}
        >
          <div className={styles.toggleThumb} />
        </button>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        Desenvolvido por alunos<br />
        1º e 3º ADM · 1º TI
      </div>
    </aside>
  );
}