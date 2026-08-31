"use client";

import { useStore } from "@/src/store/spreadsheetstore";
import styles from "./Toolbar.module.css";

export const Toolbar = () => {
  const { selectedCell, cells, setCellStyle } = useStore();
  const cellData = selectedCell ? cells.get(selectedCell) : null;
  const cellStyle = (cellData?.style ?? {}) as {
    bold?: boolean;
    italic?: boolean;
    bgColor?: string;
    textColor?: string;
    align?: "left" | "center" | "right";
  };

  const toggleBold = () => {
    if (selectedCell) {
      setCellStyle(selectedCell, {
        bold: !cellData?.style?.bold,
      });
    }
  };

  const toggleItalic = () => {
    if (selectedCell) {
      setCellStyle(selectedCell, {
        italic: !cellData?.style?.italic,
      });
    }
  };

  const setAlignment = (align: "left" | "center" | "right") => {
    if (selectedCell) {
      setCellStyle(selectedCell, { align });
    }
  };

  const setBgColor = (color: string) => {
    if (selectedCell) {
      setCellStyle(selectedCell, { bgColor: color });
    }
  };

  const setTextColor = (color: string) => {
    if (selectedCell) {
      // cast to any because setCellStyle's style type doesn't include textColor
      setCellStyle(selectedCell, { textColor: color } as any);
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarGroup}>
        <button
          className={`${styles.toolbarButton} ${cellData?.style?.bold ? styles.active : ""}`}
          onClick={toggleBold}
          title="Gras (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          className={`${styles.toolbarButton} ${cellData?.style?.italic ? styles.active : ""}`}
          onClick={toggleItalic}
          title="Italique (Ctrl+I)"
        >
          <em>I</em>
        </button>
      </div>

      <div className={styles.separator} />

      <div className={styles.toolbarGroup}>
        <button
          className={`${styles.toolbarButton} ${cellData?.style?.align === "left" ? styles.active : ""}`}
          onClick={() => setAlignment("left")}
          title="Aligner à gauche"
        >
          ≡
        </button>
        <button
          className={`${styles.toolbarButton} ${cellData?.style?.align === "center" ? styles.active : ""}`}
          onClick={() => setAlignment("center")}
          title="Centrer"
        >
          ☰
        </button>
        <button
          className={`${styles.toolbarButton} ${cellData?.style?.align === "right" ? styles.active : ""}`}
          onClick={() => setAlignment("right")}
          title="Aligner à droite"
        >
          ≡
        </button>
      </div>

      <div className={styles.separator} />

      <div className={styles.toolbarGroup}>
        <div className={styles.colorPickerWrapper}>
          <label className={styles.colorLabel} title="Couleur de fond">
            🎨
          </label>
          <input
            type="color"
            value={cellData?.style?.bgColor || "#ffffff"}
            onChange={(e) => setBgColor(e.target.value)}
            className={styles.colorPicker}
          />
        </div>
        <div className={styles.colorPickerWrapper}>
          <label className={styles.colorLabel} title="Couleur du texte">
            A
          </label>
          <input
            type="color"
            value={cellStyle.textColor || "#000000"}
            onChange={(e) => setTextColor(e.target.value)}
            className={styles.colorPicker}
          />
        </div>
      </div>

      <div className={styles.toolbarGroup} style={{ marginLeft: "auto" }}>
        <span className={styles.cellInfo}>
          {selectedCell ? `Cellule: ${selectedCell}` : "Aucune sélection"}
        </span>
      </div>
    </div>
  );
};
