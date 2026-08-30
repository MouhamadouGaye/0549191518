import styles from "./page-gap.module.css";

export function PageGap() {
  return (
    <div className={styles.gap} aria-hidden="true">
      <div className={styles.line} />
    </div>
  );
}
