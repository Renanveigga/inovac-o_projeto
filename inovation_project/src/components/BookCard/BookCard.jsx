import styles from "./BookCard.module.css";

export default function BookCard({ book }) {

  const disponivel = Boolean(book.disponivel);

  return (
    <div className={styles.card}>
      <div className={styles.badges}>
        <span className={`${styles.statusBadge} ${disponivel ? styles.disponivel : styles.emprestado}`}>
          {disponivel ? "Disponível" : "Emprestado"}
        </span>
        <span className={styles.catBadge}>{book.categoria}</span>
      </div>
      <p className={styles.titulo}>{book.titulo}</p>
      <p className={styles.autor}>{book.autor}</p>
    </div>
  );
}