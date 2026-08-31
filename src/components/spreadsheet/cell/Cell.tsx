// src/components/spreadsheet/cell/Cell.tsx

"use client";

import { useState, useEffect, useRef, memo } from "react";
import { useStore } from "@/src/store/spreadsheetstore";
import styles from "./Cell.module.css";

interface CellProps {
  row: number;
  col: number;
}

export const Cell = memo(({ row, col }: CellProps) => {
  const cellId = `${String.fromCharCode(65 + col)}${row + 1}`;
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { cells, setCellValue, selectedCell, selectCell } = useStore();
  const cellData = cells.get(cellId);
  const displayValue = cellData?.display ?? cellData?.value ?? "";

  // Focus automatique
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      setCellValue(cellId, e.currentTarget.value);
      selectCell(`${String.fromCharCode(65 + col)}${row + 2}`);
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
    if (e.key === "Tab") {
      e.preventDefault();
      setIsEditing(false);
      selectCell(`${String.fromCharCode(66 + col)}${row + 1}`);
    }
  };

  const handleClick = () => {
    selectCell(cellId);
  };

  // Styles dynamiques
  const style = cellData?.style as
    | {
        bgColor?: string;
        bold?: boolean;
        italic?: boolean;
        align?: "left" | "center" | "right";
        textColor?: string;
      }
    | undefined;

  const cellStyle = {
    backgroundColor: style?.bgColor || "transparent",
    fontWeight: style?.bold ? 700 : 400,
    fontStyle: style?.italic ? "italic" : "normal",
    textAlign: style?.align || "left",
    color: style?.textColor || "#202124",
  };

  const isSelected = selectedCell === cellId;

  return (
    <div
      className={`${styles.cell} ${isSelected ? styles.selected : ""}`}
      style={cellStyle}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          defaultValue={cellData?.value || ""}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={styles.cellInput}
        />
      ) : (
        <span className={styles.cellContent}>{displayValue}</span>
      )}
    </div>
  );
});

Cell.displayName = "Cell";
