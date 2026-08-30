import type { ReactNode } from "react";

import styles from "./editor-page.module.css";

type EditorPageProps = {
  children: ReactNode;
};

export function EditorPage({ children }: EditorPageProps) {
  return (
    <section className={styles.page}>
      {" "}
      <div className={styles.content}>{children} </div>{" "}
    </section>
  );
}
