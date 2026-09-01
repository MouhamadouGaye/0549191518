// // // // // src/components/spreadsheet/cell/Cell.tsx

// // // // "use client";

// // // // import { useState, useEffect, useRef, memo } from "react";
// // // // import { useStore } from "@/src/store/spreadsheetstore";
// // // // import styles from "./Cell.module.css";

// // // // interface CellProps {
// // // //   row: number;
// // // //   col: number;
// // // // }

// // // // export const Cell = memo(({ row, col }: CellProps) => {
// // // //   const cellId = `${String.fromCharCode(65 + col)}${row + 1}`;
// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const inputRef = useRef<HTMLInputElement>(null);

// // // //   const { cells, setCellValue, selectedCell, selectCell } = useStore();
// // // //   const cellData = cells.get(cellId);
// // // //   const displayValue = cellData?.display ?? cellData?.value ?? "";

// // // //   // Focus automatique
// // // //   useEffect(() => {
// // // //     if (isEditing && inputRef.current) {
// // // //       inputRef.current.focus();
// // // //       inputRef.current.select();
// // // //     }
// // // //   }, [isEditing]);

// // // //   const handleDoubleClick = () => {
// // // //     setIsEditing(true);
// // // //   };

// // // //   const handleBlur = () => {
// // // //     setIsEditing(false);
// // // //   };

// // // //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// // // //     if (e.key === "Enter") {
// // // //       setIsEditing(false);
// // // //       setCellValue(cellId, e.currentTarget.value);
// // // //       selectCell(`${String.fromCharCode(65 + col)}${row + 2}`);
// // // //     }
// // // //     if (e.key === "Escape") {
// // // //       setIsEditing(false);
// // // //     }
// // // //     if (e.key === "Tab") {
// // // //       e.preventDefault();
// // // //       setIsEditing(false);
// // // //       selectCell(`${String.fromCharCode(66 + col)}${row + 1}`);
// // // //     }
// // // //   };

// // // //   const handleClick = () => {
// // // //     selectCell(cellId);
// // // //   };

// // // //   // Styles dynamiques
// // // //   const style = cellData?.style as
// // // //     | {
// // // //         bgColor?: string;
// // // //         bold?: boolean;
// // // //         italic?: boolean;
// // // //         align?: "left" | "center" | "right";
// // // //         textColor?: string;
// // // //       }
// // // //     | undefined;

// // // //   const cellStyle = {
// // // //     backgroundColor: style?.bgColor || "transparent",
// // // //     fontWeight: style?.bold ? 700 : 400,
// // // //     fontStyle: style?.italic ? "italic" : "normal",
// // // //     textAlign: style?.align || "left",
// // // //     color: style?.textColor || "#202124",
// // // //   };

// // // //   const isSelected = selectedCell === cellId;

// // // //   return (
// // // //     <div
// // // //       className={`${styles.cell} ${isSelected ? styles.selected : ""}`}
// // // //       style={cellStyle}
// // // //       onClick={handleClick}
// // // //       onDoubleClick={handleDoubleClick}
// // // //     >
// // // //       {isEditing ? (
// // // //         <input
// // // //           ref={inputRef}
// // // //           type="text"
// // // //           defaultValue={cellData?.value || ""}
// // // //           onBlur={handleBlur}
// // // //           onKeyDown={handleKeyDown}
// // // //           className={styles.cellInput}
// // // //         />
// // // //       ) : (
// // // //         <span className={styles.cellContent}>{displayValue}</span>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // });

// // // // Cell.displayName = "Cell";

// // // // src/components/spreadsheet/cell/Cell.tsx

// // // "use client";

// // // import { useState, useEffect, useRef, memo } from "react";
// // // import { useStore } from "@/src/store/spreadsheetstore";
// // // import styles from "./Cell.module.css";

// // // interface CellProps {
// // //   row: number;
// // //   col: number;
// // // }

// // // export const Cell = memo(({ row, col }: CellProps) => {
// // //   const cellId = `${String.fromCharCode(65 + col)}${row + 1}`;
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const inputRef = useRef<HTMLInputElement>(null);

// // //   const { cells, setCellValue, selectedCell, selectCell } = useStore();
// // //   const cellData = cells.get(cellId);
// // //   const displayValue = cellData?.display ?? cellData?.value ?? "";

// // //   useEffect(() => {
// // //     if (isEditing && inputRef.current) {
// // //       inputRef.current.focus();
// // //       inputRef.current.select();
// // //     }
// // //   }, [isEditing]);

// // //   useEffect(() => {
// // //     if (selectedCell !== cellId) {
// // //       setIsEditing(false);
// // //     }
// // //   }, [selectedCell, cellId]);

// // //   const startEditing = () => {
// // //     setIsEditing(true);
// // //   };

// // //   const handleBlur = () => {
// // //     setTimeout(() => {
// // //       setIsEditing(false);
// // //     }, 100);
// // //   };

// // //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// // //     if (e.key === "Enter") {
// // //       e.preventDefault();
// // //       setIsEditing(false);
// // //       setCellValue(cellId, e.currentTarget.value);
// // //       const nextRow = row + 2;
// // //       selectCell(`${String.fromCharCode(65 + col)}${nextRow}`);
// // //     }
// // //     if (e.key === "Escape") {
// // //       setIsEditing(false);
// // //     }
// // //     if (e.key === "Tab") {
// // //       e.preventDefault();
// // //       setIsEditing(false);
// // //       const nextCol = String.fromCharCode(66 + col);
// // //       selectCell(`${nextCol}${row + 1}`);
// // //     }
// // //   };

// // //   const handleClick = (e: React.MouseEvent) => {
// // //     e.stopPropagation();
// // //     selectCell(cellId);
// // //   };

// // //   const handleDoubleClick = (e: React.MouseEvent) => {
// // //     e.stopPropagation();
// // //     startEditing();
// // //   };

// // //   const cellStyle = {
// // //     backgroundColor: cellData?.style?.bgColor || "transparent",
// // //     fontWeight: cellData?.style?.bold ? 700 : 400,
// // //     fontStyle: cellData?.style?.italic ? "italic" : "normal",
// // //     textAlign: cellData?.style?.align || "left",
// // //     color: cellData?.style?.textColor || "#202124",
// // //   };

// // //   const isSelected = selectedCell === cellId;

// // //   return (
// // //     <div
// // //       className={`${styles.cell} ${isSelected ? styles.selected : ""}`}
// // //       style={cellStyle}
// // //       onClick={handleClick}
// // //       onDoubleClick={handleDoubleClick}
// // //     >
// // //       {isEditing ? (
// // //         <input
// // //           ref={inputRef}
// // //           type="text"
// // //           defaultValue={cellData?.value || ""}
// // //           onBlur={handleBlur}
// // //           onKeyDown={handleKeyDown}
// // //           className={styles.cellInput}
// // //           autoFocus
// // //         />
// // //       ) : (
// // //         <span className={styles.cellContent}>{displayValue}</span>
// // //       )}
// // //     </div>
// // //   );
// // // });

// // // Cell.displayName = "Cell";
// // // src/components/spreadsheet/cell/Cell.tsx

// // "use client";

// // import { useState, useEffect, useRef, memo } from "react";
// // import { useStore } from "@/src/store/spreadsheetstore";
// // import styles from "./Cell.module.css";

// // interface CellProps {
// //   row: number;
// //   col: number;
// // }

// // export const Cell = memo(({ row, col }: CellProps) => {
// //   const cellId = `${String.fromCharCode(65 + col)}${row + 1}`;
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [inputValue, setInputValue] = useState("");
// //   const inputRef = useRef<HTMLInputElement>(null);

// //   const { cells, setCellValue, selectedCell, selectCell } = useStore();
// //   const cellData = cells.get(cellId);
// //   const displayValue = cellData?.display ?? cellData?.value ?? "";
// //   const isSelected = selectedCell === cellId;

// //   // Mettre à jour la valeur de l'input quand la cellule change
// //   useEffect(() => {
// //     if (cellData) {
// //       setInputValue(cellData.value || "");
// //     } else {
// //       setInputValue("");
// //     }
// //   }, [cellData]);

// //   // Focus automatique quand on passe en mode édition
// //   useEffect(() => {
// //     if (isEditing && inputRef.current) {
// //       inputRef.current.focus();
// //       inputRef.current.select();
// //     }
// //   }, [isEditing]);

// //   // Quitter le mode édition quand la cellule sélectionnée change
// //   useEffect(() => {
// //     if (selectedCell !== cellId && isEditing) {
// //       // Sauvegarder la valeur avant de quitter
// //       if (inputValue !== cellData?.value) {
// //         setCellValue(cellId, inputValue);
// //       }
// //       setIsEditing(false);
// //     }
// //   }, [selectedCell, cellId, isEditing, inputValue, cellData, setCellValue]);

// //   const startEditing = () => {
// //     setIsEditing(true);
// //     if (cellData) {
// //       setInputValue(cellData.value || "");
// //     } else {
// //       setInputValue("");
// //     }
// //   };

// //   const handleBlur = () => {
// //     // Sauvegarder la valeur avant de quitter
// //     if (inputValue !== cellData?.value) {
// //       setCellValue(cellId, inputValue);
// //     }
// //     setIsEditing(false);
// //   };

// //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === "Enter") {
// //       e.preventDefault();
// //       // Sauvegarder la valeur
// //       setCellValue(cellId, inputValue);
// //       setIsEditing(false);
// //       // Déplacer vers le bas
// //       const nextRow = row + 2;
// //       selectCell(`${String.fromCharCode(65 + col)}${nextRow}`);
// //     }
// //     if (e.key === "Escape") {
// //       // Annuler les changements
// //       setInputValue(cellData?.value || "");
// //       setIsEditing(false);
// //     }
// //     if (e.key === "Tab") {
// //       e.preventDefault();
// //       // Sauvegarder la valeur
// //       setCellValue(cellId, inputValue);
// //       setIsEditing(false);
// //       // Déplacer vers la droite
// //       const nextCol = String.fromCharCode(66 + col);
// //       selectCell(`${nextCol}${row + 1}`);
// //     }
// //   };

// //   const handleClick = (e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     selectCell(cellId);
// //   };

// //   const handleDoubleClick = (e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     startEditing();
// //   };

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setInputValue(e.target.value);
// //   };

// //   // Styles dynamiques
// //   const cellStyle = {
// //     backgroundColor: cellData?.style?.bgColor || "transparent",
// //     fontWeight: cellData?.style?.bold ? 700 : 400,
// //     fontStyle: cellData?.style?.italic ? "italic" : "normal",
// //     textAlign: cellData?.style?.align || "left",
// //     color: cellData?.style?.textColor || "#202124",
// //   };

// //   return (
// //     <div
// //       className={`${styles.cell} ${isSelected ? styles.selected : ""}`}
// //       style={cellStyle}
// //       onClick={handleClick}
// //       onDoubleClick={handleDoubleClick}
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
// //         <span className={styles.cellContent}>{displayValue}</span>
// //       )}
// //     </div>
// //   );
// // });

// // Cell.displayName = "Cell";
// // src/components/spreadsheet/cell/Cell.tsx (version complète)

// "use client";

// import { useState, useEffect, useRef, memo } from "react";
// import { useStore } from "@/src/store/spreadsheetstore";
// import styles from "./Cell.module.css";

// interface CellProps {
//   row: number;
//   col: number;
// }

// export const Cell = memo(({ row, col }: CellProps) => {
//   const cellId = `${String.fromCharCode(65 + col)}${row + 1}`;
//   const [isEditing, setIsEditing] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   const { cells, setCellValue, selectedCell, selectCell } = useStore();
//   const cellData = cells.get(cellId);
//   const displayValue = cellData?.display ?? cellData?.value ?? "";
//   const isSelected = selectedCell === cellId;

//   // Vérifier si la cellule voisine de droite est vide (pour le débordement)
//   const getNextCell = () => {
//     const nextCol = col + 1;
//     if (nextCol >= 26) return null;
//     const nextCellId = `${String.fromCharCode(65 + nextCol)}${row + 1}`;
//     return cells.get(nextCellId);
//   };

//   const nextCell = getNextCell();
//   const nextCellValue = nextCell?.display || nextCell?.value || "";
//   const isNextCellEmpty = !nextCellValue || nextCellValue === "";

//   // Vérifier si le texte déborde
//   const [textOverflows, setTextOverflows] = useState(false);
//   const contentRef = useRef<HTMLSpanElement>(null);

//   useEffect(() => {
//     if (contentRef.current && !isEditing) {
//       const element = contentRef.current;
//       const isOverflowing = element.scrollWidth > element.clientWidth;
//       setTextOverflows(isOverflowing);
//     }
//   }, [displayValue, isEditing]);

//   // Mettre à jour la valeur de l'input quand la cellule change
//   useEffect(() => {
//     if (cellData) {
//       setInputValue(cellData.value || "");
//     } else {
//       setInputValue("");
//     }
//   }, [cellData]);

//   // Focus automatique quand on passe en mode édition
//   useEffect(() => {
//     if (isEditing && inputRef.current) {
//       inputRef.current.focus();
//       inputRef.current.select();
//     }
//   }, [isEditing]);

//   // Quitter le mode édition quand la cellule sélectionnée change
//   useEffect(() => {
//     if (selectedCell !== cellId && isEditing) {
//       if (inputValue !== cellData?.value) {
//         setCellValue(cellId, inputValue);
//       }
//       setIsEditing(false);
//     }
//   }, [selectedCell, cellId, isEditing, inputValue, cellData, setCellValue]);

//   const startEditing = () => {
//     setIsEditing(true);
//     if (cellData) {
//       setInputValue(cellData.value || "");
//     } else {
//       setInputValue("");
//     }
//   };

//   const handleBlur = () => {
//     if (inputValue !== cellData?.value) {
//       setCellValue(cellId, inputValue);
//     }
//     setIsEditing(false);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       setCellValue(cellId, inputValue);
//       setIsEditing(false);
//       const nextRow = row + 2;
//       selectCell(`${String.fromCharCode(65 + col)}${nextRow}`);
//     }
//     if (e.key === "Escape") {
//       setInputValue(cellData?.value || "");
//       setIsEditing(false);
//     }
//     if (e.key === "Tab") {
//       e.preventDefault();
//       setCellValue(cellId, inputValue);
//       setIsEditing(false);
//       const nextCol = String.fromCharCode(66 + col);
//       selectCell(`${nextCol}${row + 1}`);
//     }
//   };

//   const handleClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     selectCell(cellId);
//   };

//   const handleDoubleClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     startEditing();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   // Styles dynamiques
//   const cellStyle = {
//     backgroundColor: cellData?.style?.bgColor || "transparent",
//     fontWeight: cellData?.style?.bold ? 700 : 400,
//     fontStyle: cellData?.style?.italic ? "italic" : "normal",
//     textAlign: cellData?.style?.align || "left",
//     color: cellData?.style?.textColor || "#202124",
//   };

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
//         <>
//           <span
//             ref={contentRef}
//             className={`${styles.cellContent} ${textOverflows && isNextCellEmpty ? styles.overflow : ""}`}
//           >
//             {displayValue}
//           </span>
//           {/* Afficher le texte qui déborde sur la cellule suivante si elle est vide */}
//           {textOverflows && isNextCellEmpty && nextCell && (
//             <span className={styles.overflowText}>{displayValue}</span>
//           )}
//         </>
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

  // Utiliser des sélecteurs pour éviter les re-rendus inutiles
  const cellData = useStore((state) => state.cells.get(cellId));
  const selectedCell = useStore((state) => state.selectedCell);
  const setCellValue = useStore((state) => state.setCellValue);
  const selectCell = useStore((state) => state.selectCell);
  const setCellStyle = useStore((state) => state.setCellStyle);

  const displayValue = cellData?.display ?? cellData?.value ?? "";
  const isSelected = selectedCell === cellId;

  // Style mémoisé
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
    setInputValue(cellData?.value || "");
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
      if (inputValue !== cellData?.value) {
        setCellValue(cellId, inputValue);
      }
      setIsEditing(false);
    }
  }, [selectedCell, cellId, isEditing, inputValue, cellData, setCellValue]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
    setInputValue(cellData?.value || "");
  }, [cellData]);

  const handleBlur = useCallback(() => {
    if (inputValue !== cellData?.value) {
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
        setInputValue(cellData?.value || "");
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
