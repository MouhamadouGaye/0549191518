"use client";

import { Cell } from "../cell/Cell";
import styles from "./Grid.module.css";

interface GridProps {
  rows?: number;
  cols?: number;
}

export const Grid = ({ rows = 10000, cols = 26 }: GridProps) => {
  const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

  // Générer les lignes
  const rowsData = Array.from({ length: rows }, (_, rowIndex) => ({
    rowIndex,
    cells: Array.from({ length: cols }, (_, colIndex) => ({
      row: rowIndex,
      col: colIndex,
    })),
  }));

  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridWrapper}>
        {/* En-têtes */}
        <div className={styles.headerRow}>
          <div className={styles.corner} />
          {Array.from({ length: cols }).map((_, i) => (
            <div key={`col-${i}`} className={styles.columnHeader}>
              {getColumnLabel(i)}
            </div>
          ))}
        </div>

        {/* Corps */}
        {rowsData.map(({ rowIndex, cells: rowCells }) => (
          <div key={`row-${rowIndex}`} className={styles.dataRow}>
            <div className={styles.rowHeader}>{rowIndex + 1}</div>
            {rowCells.map(({ row, col }) => (
              <Cell key={`${row}-${col}`} row={row} col={col} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
