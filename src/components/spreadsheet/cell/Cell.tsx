// // "use client";

// // import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
// // import { useStore } from "@/src/store/spreadsheetstore";
// // import styles from "./Cell.module.css";

// // interface CellProps {
// //   row: number;
// //   col: number;
// // }

// // export const Cell = memo(({ row, col }: CellProps) => {
// //   const cellId = useMemo(
// //     () => `${String.fromCharCode(65 + col)}${row + 1}`,
// //     [row, col],
// //   );
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [inputValue, setInputValue] = useState("");
// //   const inputRef = useRef<HTMLInputElement>(null);

// //   const cellData = useStore((state) => state.cells.get(cellId));
// //   const selectedCell = useStore((state) => state.selectedCell);
// //   const selectedRange = useStore((state) => state.selectedRange);
// //   const setCellValue = useStore((state) => state.setCellValue);
// //   const selectCell = useStore((state) => state.selectCell);
// //   const getRangeCells = useStore((state) => state.getRangeCells);

// //   // Vérifier si la cellule est dans la plage sélectionnée
// //   const isInRange = useMemo(() => {
// //     if (!selectedRange) return false;
// //     const rangeCells = getRangeCells(selectedRange.start, selectedRange.end);
// //     return rangeCells.includes(cellId);
// //   }, [selectedRange, getRangeCells, cellId]);

// //   const displayValue = useMemo(() => {
// //     if (!cellData) return "";
// //     if (cellData.display) return cellData.display;
// //     if (cellData.value === null) return "";
// //     if (typeof cellData.value === "boolean")
// //       return cellData.value ? "VRAI" : "FAUX";
// //     return cellData.value.toString();
// //   }, [cellData]);

// //   const isSelected = useMemo(
// //     () => selectedCell === cellId,
// //     [selectedCell, cellId],
// //   );

// //   const cellStyle = useMemo(
// //     () => ({
// //       backgroundColor: cellData?.style?.bgColor || "#ffffff",
// //       fontWeight: cellData?.style?.bold ? 700 : 400,
// //       fontStyle: cellData?.style?.italic ? "italic" : "normal",
// //       textAlign: cellData?.style?.align || "left",
// //       color: cellData?.style?.textColor || "#202124",
// //     }),
// //     [cellData],
// //   );

// //   useEffect(() => {
// //     if (cellData) {
// //       const val = cellData.formula || cellData.value;
// //       if (val === null) setInputValue("");
// //       else if (typeof val === "boolean") setInputValue(val ? "VRAI" : "FAUX");
// //       else setInputValue(val.toString());
// //     } else {
// //       setInputValue("");
// //     }
// //   }, [cellData]);

// //   useEffect(() => {
// //     if (isEditing && inputRef.current) {
// //       requestAnimationFrame(() => {
// //         inputRef.current?.focus();
// //         inputRef.current?.select();
// //       });
// //     }
// //   }, [isEditing]);

// //   useEffect(() => {
// //     if (selectedCell !== cellId && isEditing) {
// //       const currentValue =
// //         cellData?.formula || cellData?.value?.toString() || "";
// //       if (inputValue !== currentValue) {
// //         setCellValue(cellId, inputValue);
// //       }
// //       setIsEditing(false);
// //     }
// //   }, [selectedCell, cellId, isEditing, inputValue, cellData, setCellValue]);

// //   const startEditing = useCallback(() => {
// //     setIsEditing(true);
// //     if (cellData) {
// //       const val = cellData.formula || cellData.value;
// //       if (val === null) setInputValue("");
// //       else if (typeof val === "boolean") setInputValue(val ? "VRAI" : "FAUX");
// //       else setInputValue(val.toString());
// //     } else {
// //       setInputValue("");
// //     }
// //   }, [cellData]);

// //   const handleBlur = useCallback(() => {
// //     if (isEditing) {
// //       const currentValue =
// //         cellData?.formula || cellData?.value?.toString() || "";
// //       if (inputValue !== currentValue) {
// //         setCellValue(cellId, inputValue);
// //       }
// //       setIsEditing(false);
// //     }
// //   }, [cellId, inputValue, cellData, setCellValue, isEditing]);

// //   const handleKeyDown = useCallback(
// //     (e: React.KeyboardEvent<HTMLInputElement>) => {
// //       if (e.key === "Enter") {
// //         e.preventDefault();
// //         setCellValue(cellId, inputValue);
// //         setIsEditing(false);
// //         const nextRow = row + 2;
// //         selectCell(`${String.fromCharCode(65 + col)}${nextRow}`);
// //       }
// //       if (e.key === "Escape") {
// //         e.preventDefault();
// //         const val = cellData?.formula || cellData?.value;
// //         if (val === null) setInputValue("");
// //         else if (typeof val === "boolean") setInputValue(val ? "VRAI" : "FAUX");
// //         else setInputValue(val?.toString() || "");
// //         setIsEditing(false);
// //       }
// //       if (e.key === "Tab") {
// //         e.preventDefault();
// //         setCellValue(cellId, inputValue);
// //         setIsEditing(false);
// //         const nextCol = String.fromCharCode(66 + col);
// //         selectCell(`${nextCol}${row + 1}`);
// //       }
// //     },
// //     [cellId, inputValue, row, col, cellData, setCellValue, selectCell],
// //   );

// //   const handleClick = useCallback(
// //     (e: React.MouseEvent) => {
// //       e.stopPropagation();
// //       // Si Shift est enfoncé, on sélectionne une plage
// //       if (e.shiftKey && selectedCell) {
// //         const { selectRange } = useStore.getState();
// //         selectRange(selectedCell, cellId);
// //       } else {
// //         selectCell(cellId);
// //       }
// //     },
// //     [cellId, selectedCell, selectCell],
// //   );

// //   const handleDoubleClick = useCallback(
// //     (e: React.MouseEvent) => {
// //       e.stopPropagation();
// //       startEditing();
// //     },
// //     [startEditing],
// //   );

// //   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
// //     setInputValue(e.target.value);
// //   }, []);

// //   return (
// //     <div
// //       className={`${styles.cell} ${isSelected ? styles.selected : ""} ${isInRange ? styles.inRange : ""}`}
// //       style={cellStyle}
// //       onClick={handleClick}
// //       onDoubleClick={handleDoubleClick}
// //       data-cell-id={cellId}
// //     >
// //       {isEditing ? (
// //         <input
// //           ref={inputRef}
// //           type="text"
// //           value={inputValue}
// //           onChange={handleChange}
// //           onBlur={handleBlur}
// //           onKeyDown={handleKeyDown}
// //           className={styles.cellInput}
// //           autoFocus
// //         />
// //       ) : (
// //         <span className={styles.cellContent} title={displayValue}>
// //           {displayValue}
// //         </span>
// //       )}
// //     </div>
// //   );
// // });

// // Cell.displayName = "Cell";
// // src/components/spreadsheet/cell/Cell.tsx

// "use client";

// import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
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
//   const cellRef = useRef<HTMLDivElement>(null);

//   const cellData = useStore((state) => state.cells.get(cellId));
//   const selectedCell = useStore((state) => state.selectedCell);
//   const selectedRange = useStore((state) => state.selectedRange);
//   const setCellValue = useStore((state) => state.setCellValue);
//   const selectCell = useStore((state) => state.selectCell);
//   const selectRange = useStore((state) => state.selectRange);
//   const getRangeCells = useStore((state) => state.getRangeCells);

//   // Vérifier si la cellule est dans la plage sélectionnée
//   const isInRange = useMemo(() => {
//     if (!selectedRange) return false;
//     const rangeCells = getRangeCells(selectedRange.start, selectedRange.end);
//     return rangeCells.includes(cellId);
//   }, [selectedRange, getRangeCells, cellId]);

//   const displayValue = useMemo(() => {
//     if (!cellData) return "";
//     if (cellData.display) return cellData.display;
//     if (cellData.value === null) return "";
//     if (typeof cellData.value === "boolean")
//       return cellData.value ? "VRAI" : "FAUX";
//     return cellData.value.toString();
//   }, [cellData]);

//   const isSelected = useMemo(
//     () => selectedCell === cellId,
//     [selectedCell, cellId],
//   );

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

//   useEffect(() => {
//     if (cellData) {
//       const val = cellData.formula || cellData.value;
//       if (val === null) setInputValue("");
//       else if (typeof val === "boolean") setInputValue(val ? "VRAI" : "FAUX");
//       else setInputValue(val.toString());
//     } else {
//       setInputValue("");
//     }
//   }, [cellData]);

//   useEffect(() => {
//     if (isEditing && inputRef.current) {
//       requestAnimationFrame(() => {
//         inputRef.current?.focus();
//         inputRef.current?.select();
//       });
//     }
//   }, [isEditing]);

//   useEffect(() => {
//     if (selectedCell !== cellId && isEditing) {
//       const currentValue =
//         cellData?.formula || cellData?.value?.toString() || "";
//       if (inputValue !== currentValue) {
//         setCellValue(cellId, inputValue);
//       }
//       setIsEditing(false);
//     }
//   }, [selectedCell, cellId, isEditing, inputValue, cellData, setCellValue]);

//   const startEditing = useCallback(() => {
//     setIsEditing(true);
//     if (cellData) {
//       const val = cellData.formula || cellData.value;
//       if (val === null) setInputValue("");
//       else if (typeof val === "boolean") setInputValue(val ? "VRAI" : "FAUX");
//       else setInputValue(val.toString());
//     } else {
//       setInputValue("");
//     }
//   }, [cellData]);

//   const handleBlur = useCallback(() => {
//     if (isEditing) {
//       const currentValue =
//         cellData?.formula || cellData?.value?.toString() || "";
//       if (inputValue !== currentValue) {
//         setCellValue(cellId, inputValue);
//       }
//       setIsEditing(false);
//     }
//   }, [cellId, inputValue, cellData, setCellValue, isEditing]);

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
//         e.preventDefault();
//         const val = cellData?.formula || cellData?.value;
//         if (val === null) setInputValue("");
//         else if (typeof val === "boolean") setInputValue(val ? "VRAI" : "FAUX");
//         else setInputValue(val?.toString() || "");
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

//   // Gestion du clic (sélection simple)
//   const handleClick = useCallback(
//     (e: React.MouseEvent) => {
//       e.stopPropagation();

//       // Si Shift est enfoncé, on étend la sélection
//       if (e.shiftKey && selectedCell) {
//         selectRange(selectedCell, cellId);
//       } else {
//         selectCell(cellId);
//       }
//     },
//     [cellId, selectedCell, selectCell, selectRange],
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

//   // Empêcher le drag de sélectionner du texte
//   const handleMouseDown = useCallback((e: React.MouseEvent) => {
//     // Ne pas empêcher l'événement pour permettre le drag
//   }, []);

//   return (
//     <div
//       ref={cellRef}
//       className={`${styles.cell} ${isSelected ? styles.selected : ""} ${isInRange ? styles.inRange : ""}`}
//       style={cellStyle}
//       onClick={handleClick}
//       onDoubleClick={handleDoubleClick}
//       onMouseDown={handleMouseDown}
//       data-cell-id={cellId}
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

import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
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
  const cellRef = useRef<HTMLDivElement>(null);

  const cellData = useStore((state) => state.cells.get(cellId));
  const selectedCell = useStore((state) => state.selectedCell);
  const selectedRange = useStore((state) => state.selectedRange);
  const setCellValue = useStore((state) => state.setCellValue);
  const selectCell = useStore((state) => state.selectCell);
  const selectRange = useStore((state) => state.selectRange);
  const getRangeCells = useStore((state) => state.getRangeCells);

  // Vérifier si la cellule est dans la plage sélectionnée
  const isInRange = useMemo(() => {
    if (!selectedRange) return false;
    const rangeCells = getRangeCells(selectedRange.start, selectedRange.end);
    return rangeCells.includes(cellId);
  }, [selectedRange, getRangeCells, cellId]);

  // ============ VALEUR AFFICHÉE ============
  const displayValue = useMemo(() => {
    if (!cellData) return "";
    if (cellData.display) return cellData.display;
    if (cellData.value === null) return "";
    if (typeof cellData.value === "boolean")
      return cellData.value ? "VRAI" : "FAUX";
    return cellData.value.toString();
  }, [cellData]);

  const isSelected = useMemo(
    () => selectedCell === cellId,
    [selectedCell, cellId],
  );

  // ============ STYLE DE LA CELLULE ============
  const cellStyle = useMemo(() => {
    const style = cellData?.style || {
      bgColor: "#ffffff",
      bold: false,
      italic: false,
      textColor: "#202124",
      align: "left" as const,
      fontSize: 13,
      fontFamily: "Arial",
    };

    return {
      backgroundColor: style.bgColor || "#ffffff",
      fontWeight: style.bold ? 700 : 400,
      fontStyle: style.italic ? "italic" : "normal",
      textAlign: style.align || "left",
      color: style.textColor || "#202124",
      fontSize: `${style.fontSize || 13}px`,
      fontFamily: style.fontFamily || "Arial",
    };
  }, [cellData]);

  // ============ EFFETS ============
  useEffect(() => {
    if (cellData) {
      const val = cellData.formula || cellData.value;
      if (val === null) setInputValue("");
      else if (typeof val === "boolean") setInputValue(val ? "VRAI" : "FAUX");
      else setInputValue(val.toString());
    } else {
      setInputValue("");
    }
  }, [cellData]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [isEditing]);

  useEffect(() => {
    if (selectedCell !== cellId && isEditing) {
      const currentValue =
        cellData?.formula || cellData?.value?.toString() || "";
      if (inputValue !== currentValue) {
        setCellValue(cellId, inputValue);
      }
      setIsEditing(false);
    }
  }, [selectedCell, cellId, isEditing, inputValue, cellData, setCellValue]);

  // ============ CALLBACKS ============
  const startEditing = useCallback(() => {
    setIsEditing(true);
    if (cellData) {
      const val = cellData.formula || cellData.value;
      if (val === null) setInputValue("");
      else if (typeof val === "boolean") setInputValue(val ? "VRAI" : "FAUX");
      else setInputValue(val.toString());
    } else {
      setInputValue("");
    }
  }, [cellData]);

  const handleBlur = useCallback(() => {
    if (isEditing) {
      const currentValue =
        cellData?.formula || cellData?.value?.toString() || "";
      if (inputValue !== currentValue) {
        setCellValue(cellId, inputValue);
      }
      setIsEditing(false);
    }
  }, [cellId, inputValue, cellData, setCellValue, isEditing]);

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
        e.preventDefault();
        const val = cellData?.formula || cellData?.value;
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
      if (e.shiftKey && selectedCell) {
        selectRange(selectedCell, cellId);
      } else {
        selectCell(cellId);
      }
    },
    [cellId, selectedCell, selectCell, selectRange],
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

  // ============ RENDU ============
  return (
    <div
      ref={cellRef}
      className={`${styles.cell} ${isSelected ? styles.selected : ""} ${isInRange ? styles.inRange : ""}`}
      style={cellStyle}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      data-cell-id={cellId}
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
          style={{
            fontSize: `${cellData?.style?.fontSize || 13}px`,
            fontFamily: cellData?.style?.fontFamily || "Arial",
          }}
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
