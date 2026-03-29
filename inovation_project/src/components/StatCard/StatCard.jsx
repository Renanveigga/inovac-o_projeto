import { useEffect, useState } from "react";
import styles from "./StatCard.module.css";

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!target) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export default function StatCard({ icon, label, value, sub, cor }) {
  const animatedValue = useCountUp(value);

  return (
    <div className={styles.card} style={{ "--cor": cor }}>
      <div className={styles.iconBox}>{icon}</div>
      <div className={styles.info}>
        <p className={styles.value}>{animatedValue}</p>
        <p className={styles.label}>{label}</p>
        {sub && <p className={styles.sub}>{sub}</p>}
      </div>
      <div className={styles.bar} />
    </div>
  );
}