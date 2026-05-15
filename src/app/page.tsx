import styles from "./page.module.css";
import { HomeCTA } from "./HomeCTA";

export default function Home() {
  return (
    <main className={styles.hero}>
      <h1 className={styles.title}>Welcome to Budget Planner</h1>
      <p className={styles.subtitle}>Your financial platform, built for scale.</p>
      <HomeCTA />
    </main>
  );
}
