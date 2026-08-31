"use client";

import { useState, useEffect } from "react";
// import { useStore } from "@/store/spreadsheetStore";
import styles from "./FormulaBar.module.css";
import { useStore } from "@/src/store/spreadsheetstore";

export const FormulaBar = () => {
  const { selectedCell, cells, setCellValue } = useStore();
  const cellData = selectedCell ? cells.get(selectedCell) : null;
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(cellData?.value || "");
  }, [selectedCell, cellData]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && selectedCell) {
      setCellValue(selectedCell, value);
    }
  };

  return (
    <div className={styles.formulaBar}>
      <div className={styles.cellReference}>{selectedCell || ""}</div>
      <div className={styles.separator} />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.formulaInput}
        placeholder="Saisissez une valeur ou une formule (=SOMME(A1:A10))"
        spellCheck={false}
      />
    </div>
  );
};
