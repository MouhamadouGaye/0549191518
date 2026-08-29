import styles from "./top-bar.module.css";

export function TopBar() {
  return (
    <header className={styles.topBar}>
      <div className={styles.left}>
        <button className={styles.logo} aria-label="Accueil">
          D
        </button>

        <div className={styles.documentInfo}>
          <input
            className={styles.title}
            defaultValue="Mon document"
            aria-label="Nom du document"
          />

          <span className={styles.status}>Enregistré</span>
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.action}>Partager</button>

        <button className={styles.export}>Exporter</button>

        <button className={styles.menu} aria-label="Menu">
          •••
        </button>
      </div>
    </header>
  );
}
