import { DocumentEditor } from "../editor/document-editor";
import styles from "./app-shell.module.css";
import { TopBar } from "./top.bar";

export function AppShell() {
  return (
    <main className={styles.shell}>
      <TopBar />

      <div className={styles.workspace}>
        <div className={styles.documentArea}>
          <div className={styles.page}>
            <div className={styles.pageContent}>
              <DocumentEditor />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
