// "use client";

// import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
// import { useStore } from "@/src/store/spreadsheetstore";
// import styles from "./Cell.module.css";

// interface CellProps {
//   row: number;
//   col: number;
// }

// export const Cell = memo(({ row, col }: CellProps) => {
//   const cellId = useMemo(
//     () => `${String.fromCharCode(65 + col)}${row + 1}`,
//     [row, col],
//   );
//   const [isEditing, setIsEditing] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Utiliser des sélecteurs pour éviter les re-rendus inutiles
//   const cellData = useStore((state) => state.cells.get(cellId));
//   const selectedCell = useStore((state) => state.selectedCell);
//   const setCellValue = useStore((state) => state.setCellValue);
//   const selectCell = useStore((state) => state.selectCell);
//   const setCellStyle = useStore((state) => state.setCellStyle);

//   const displayValue = cellData?.display ?? cellData?.value ?? "";
//   const isSelected = selectedCell === cellId;

//   // Style mémoisé
//   const cellStyle = useMemo(
//     () => ({
//       backgroundColor: cellData?.style?.bgColor || "#ffffff",
//       fontWeight: cellData?.style?.bold ? 700 : 400,
//       fontStyle: cellData?.style?.italic ? "italic" : "normal",
//       textAlign: cellData?.style?.align || "left",
//       color: cellData?.style?.textColor || "#202124",
//     }),
//     [cellData],
//   );

//   // Mettre à jour la valeur de l'input
//   useEffect(() => {
//     setInputValue(cellData?.value || "");
//   }, [cellData]);

//   // Focus automatique
//   useEffect(() => {
//     if (isEditing && inputRef.current) {
//       inputRef.current.focus();
//       inputRef.current.select();
//     }
//   }, [isEditing]);

//   // Quitter le mode édition
//   useEffect(() => {
//     if (selectedCell !== cellId && isEditing) {
//       if (inputValue !== cellData?.value) {
//         setCellValue(cellId, inputValue);
//       }
//       setIsEditing(false);
//     }
//   }, [selectedCell, cellId, isEditing, inputValue, cellData, setCellValue]);

//   const startEditing = useCallback(() => {
//     setIsEditing(true);
//     setInputValue(cellData?.value || "");
//   }, [cellData]);

//   const handleBlur = useCallback(() => {
//     if (inputValue !== cellData?.value) {
//       setCellValue(cellId, inputValue);
//     }
//     setIsEditing(false);
//   }, [cellId, inputValue, cellData, setCellValue]);

//   const handleKeyDown = useCallback(
//     (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         setCellValue(cellId, inputValue);
//         setIsEditing(false);
//         const nextRow = row + 2;
//         selectCell(`${String.fromCharCode(65 + col)}${nextRow}`);
//       }
//       if (e.key === "Escape") {
//         setInputValue(cellData?.value || "");
//         setIsEditing(false);
//       }
//       if (e.key === "Tab") {
//         e.preventDefault();
//         setCellValue(cellId, inputValue);
//         setIsEditing(false);
//         const nextCol = String.fromCharCode(66 + col);
//         selectCell(`${nextCol}${row + 1}`);
//       }
//     },
//     [cellId, inputValue, row, col, cellData, setCellValue, selectCell],
//   );

//   const handleClick = useCallback(
//     (e: React.MouseEvent) => {
//       e.stopPropagation();
//       selectCell(cellId);
//     },
//     [cellId, selectCell],
//   );

//   const handleDoubleClick = useCallback(
//     (e: React.MouseEvent) => {
//       e.stopPropagation();
//       startEditing();
//     },
//     [startEditing],
//   );

//   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   }, []);

//   return (
//     <div
//       className={`${styles.cell} ${isSelected ? styles.selected : ""}`}
//       style={cellStyle}
//       onClick={handleClick}
//       onDoubleClick={handleDoubleClick}
//     >
//       {isEditing ? (
//         <input
//           ref={inputRef}
//           type="text"
//           value={inputValue}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           onKeyDown={handleKeyDown}
//           className={styles.cellInput}
//           autoFocus
//         />
//       ) : (
//         <span className={styles.cellContent} title={displayValue}>
//           {displayValue}
//         </span>
//       )}
//     </div>
//   );
// });

// Cell.displayName = "Cell";
// src/components/spreadsheet/cell/Cell.tsx

"use client";

import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import { useStore } from "@/src/store/spreadsheetstore";
import styles from "./Cell.module.css";

interface CellProps {
  row: number;
  col: number;
}

export const Cell = memo(({ row, col }: CellProps) => {
  const cellId = useMemo(
    () => `${String.fromCharCode(65 + col)}${row + 1}`,
    [row, col],
  );
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const cellData = useStore((state) => state.cells.get(cellId));
  const selectedCell = useStore((state) => state.selectedCell);
  const setCellValue = useStore((state) => state.setCellValue);
  const selectCell = useStore((state) => state.selectCell);

  // Obtenir la valeur d'affichage
  const getDisplayValue = useCallback(() => {
    if (!cellData) return "";
    if (cellData.display) return cellData.display;
    if (cellData.value === null) return "";
    if (typeof cellData.value === "boolean")
      return cellData.value ? "VRAI" : "FAUX";
    return cellData.value.toString();
  }, [cellData]);

  const displayValue = getDisplayValue();
  const isSelected = selectedCell === cellId;

  const cellStyle = useMemo(
    () => ({
      backgroundColor: cellData?.style?.bgColor || "#ffffff",
      fontWeight: cellData?.style?.bold ? 700 : 400,
      fontStyle: cellData?.style?.italic ? "italic" : "normal",
      textAlign: cellData?.style?.align || "left",
      color: cellData?.style?.textColor || "#202124",
    }),
    [cellData],
  );

  // Mettre à jour la valeur de l'input
  useEffect(() => {
    if (cellData) {
      const val = cellData.value;
      if (val === null) setInputValue("");
      else if (typeof val === "boolean") setInputValue(val ? "VRAI" : "FAUX");
      else setInputValue(val.toString());
    } else {
      setInputValue("");
    }
  }, [cellData]);

  // Focus automatique
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Quitter le mode édition
  useEffect(() => {
    if (selectedCell !== cellId && isEditing) {
      if (inputValue !== (cellData?.value?.toString() || "")) {
        setCellValue(cellId, inputValue);
      }
      setIsEditing(false);
    }
  }, [selectedCell, cellId, isEditing, inputValue, cellData, setCellValue]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
    if (cellData) {
      const val = cellData.value;
      if (val === null) setInputValue("");
      else if (typeof val === "boolean") setInputValue(val ? "VRAI" : "FAUX");
      else setInputValue(val.toString());
    } else {
      setInputValue("");
    }
  }, [cellData]);

  const handleBlur = useCallback(() => {
    if (inputValue !== (cellData?.value?.toString() || "")) {
      setCellValue(cellId, inputValue);
    }
    setIsEditing(false);
  }, [cellId, inputValue, cellData, setCellValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setCellValue(cellId, inputValue);
        setIsEditing(false);
        const nextRow = row + 2;
        selectCell(`${String.fromCharCode(65 + col)}${nextRow}`);
      }
      if (e.key === "Escape") {
        const val = cellData?.value;
        if (val === null) setInputValue("");
        else if (typeof val === "boolean") setInputValue(val ? "VRAI" : "FAUX");
        else setInputValue(val?.toString() || "");
        setIsEditing(false);
      }
      if (e.key === "Tab") {
        e.preventDefault();
        setCellValue(cellId, inputValue);
        setIsEditing(false);
        const nextCol = String.fromCharCode(66 + col);
        selectCell(`${nextCol}${row + 1}`);
      }
    },
    [cellId, inputValue, row, col, cellData, setCellValue, selectCell],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      selectCell(cellId);
    },
    [cellId, selectCell],
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      startEditing();
    },
    [startEditing],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

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
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={styles.cellInput}
          autoFocus
        />
      ) : (
        <span className={styles.cellContent} title={displayValue}>
          {displayValue}
        </span>
      )}
    </div>
  );
});

Cell.displayName = "Cell";
