// // "use client";

// // import { useState, useCallback, useMemo, useRef, useEffect } from "react";
// // import { useStore } from "@/src/store/spreadsheetstore";
// // // import { RangeSelector } from "../RangeSelector";
// // import styles from "./Toolbar.module.css";
// // import { CellStyle } from "@/src/store/types";
// // import { RangeSelector } from "../range/RangeSelector";

// // // Polices disponibles
// // const FONTS = [
// //   "Arial",
// //   "Helvetica",
// //   "Times New Roman",
// //   "Courier New",
// //   "Georgia",
// //   "Verdana",
// //   "Tahoma",
// //   "Trebuchet MS",
// //   "Impact",
// //   "Comic Sans MS",
// // ];

// // // Tailles de police disponibles
// // const FONT_SIZES = [
// //   8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 28, 32, 36, 48, 72,
// // ];

// // export const ToolBar = () => {
// //   const [showRangeSelector, setShowRangeSelector] = useState(false);
// //   const [showFontMenu, setShowFontMenu] = useState(false);
// //   const [showSizeMenu, setShowSizeMenu] = useState(false);
// //   const fontMenuRef = useRef<HTMLDivElement>(null);
// //   const sizeMenuRef = useRef<HTMLDivElement>(null);

// //   const selectedCell = useStore((state) => state.selectedCell);
// //   const selectedRange = useStore((state) => state.selectedRange);
// //   const cellData = useStore((state) =>
// //     selectedCell ? state.cells.get(selectedCell) : null,
// //   );
// //   const setCellStyle = useStore((state) => state.setCellStyle);
// //   const applyStyleToRange = useStore((state) => state.applyStyleToRange);
// //   const clearRange = useStore((state) => state.clearRange);
// //   const selectRange = useStore((state) => state.selectRange);
// //   const copyRange = useStore((state) => state.copyRange);
// //   const cutRange = useStore((state) => state.cutRange);
// //   const pasteRange = useStore((state) => state.pasteRange);
// //   const getClipboardData = useStore((state) => state.getClipboardData);
// //   const clearClipboard = useStore((state) => state.clearClipboard);
// //   const increaseFontSize = useStore((state) => state.increaseFontSize);
// //   const decreaseFontSize = useStore((state) => state.decreaseFontSize);
// //   const setFontFamily = useStore((state) => state.setFontFamily);
// //   const getRangeCells = useStore((state) => state.getRangeCells);

// //   const hasRange = !!selectedRange;
// //   const hasSelection = !!selectedCell || hasRange;

// //   // Fermer les menus au clic extérieur
// //   useEffect(() => {
// //     const handleClickOutside = (e: MouseEvent) => {
// //       if (
// //         fontMenuRef.current &&
// //         !fontMenuRef.current.contains(e.target as Node)
// //       ) {
// //         setShowFontMenu(false);
// //       }
// //       if (
// //         sizeMenuRef.current &&
// //         !sizeMenuRef.current.contains(e.target as Node)
// //       ) {
// //         setShowSizeMenu(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Appliquer le style à la plage ou à la cellule
// //   const applyStyle = useCallback(
// //     (style: Partial<CellStyle>) => {
// //       if (hasRange && selectedRange) {
// //         applyStyleToRange(selectedRange.start, selectedRange.end, style);
// //       } else if (selectedCell) {
// //         setCellStyle(selectedCell, style);
// //       }
// //     },
// //     [hasRange, selectedRange, selectedCell, applyStyleToRange, setCellStyle],
// //   );

// //   // Obtenir l'état du style
// //   const getStyleState = useCallback(
// //     (key: keyof CellStyle) => {
// //       if (hasRange && selectedRange) {
// //         const cells = getRangeCells(selectedRange.start, selectedRange.end);
// //         const styles = cells.map((id) => {
// //           const data = useStore.getState().cells.get(id);
// //           return data?.style?.[key];
// //         });
// //         const uniqueStyles = [...new Set(styles)];
// //         if (uniqueStyles.length === 1) {
// //           return uniqueStyles[0];
// //         }
// //         return undefined;
// //       }
// //       return cellData?.style?.[key];
// //     },
// //     [hasRange, selectedRange, cellData, getRangeCells],
// //   );

// //   // === ACTIONS DE STYLE ===
// //   const toggleBold = useCallback(() => {
// //     const current = getStyleState("bold");
// //     applyStyle({ bold: !current });
// //   }, [getStyleState, applyStyle]);

// //   const toggleItalic = useCallback(() => {
// //     const current = getStyleState("italic");
// //     applyStyle({ italic: !current });
// //   }, [getStyleState, applyStyle]);

// //   const toggleUnderline = useCallback(() => {
// //     const current = getStyleState("underline");
// //     applyStyle({ underline: !current });
// //   }, [getStyleState, applyStyle]);

// //   const toggleStrikethrough = useCallback(() => {
// //     const current = getStyleState("strikethrough");
// //     applyStyle({ strikethrough: !current });
// //   }, [getStyleState, applyStyle]);

// //   const setAlignment = useCallback(
// //     (align: "left" | "center" | "right") => {
// //       applyStyle({ align });
// //     },
// //     [applyStyle],
// //   );

// //   const setBgColor = useCallback(
// //     (color: string) => {
// //       applyStyle({ bgColor: color });
// //     },
// //     [applyStyle],
// //   );

// //   const setTextColor = useCallback(
// //     (color: string) => {
// //       applyStyle({ textColor: color });
// //     },
// //     [applyStyle],
// //   );

// //   const setFont = useCallback(
// //     (fontFamily: string) => {
// //       if (hasRange && selectedRange) {
// //         const cells = getRangeCells(selectedRange.start, selectedRange.end);
// //         for (const id of cells) {
// //           setFontFamily(id, fontFamily);
// //         }
// //       } else if (selectedCell) {
// //         setFontFamily(selectedCell, fontFamily);
// //       }
// //       setShowFontMenu(false);
// //     },
// //     [hasRange, selectedRange, selectedCell, setFontFamily, getRangeCells],
// //   );

// //   const changeFontSize = useCallback(
// //     (size: number) => {
// //       applyStyle({ fontSize: size });
// //       setShowSizeMenu(false);
// //     },
// //     [applyStyle],
// //   );

// //   const handleIncreaseFontSize = useCallback(() => {
// //     if (hasRange && selectedRange) {
// //       const cells = getRangeCells(selectedRange.start, selectedRange.end);
// //       for (const id of cells) {
// //         increaseFontSize(id);
// //       }
// //     } else if (selectedCell) {
// //       increaseFontSize(selectedCell);
// //     }
// //   }, [hasRange, selectedRange, selectedCell, increaseFontSize, getRangeCells]);

// //   const handleDecreaseFontSize = useCallback(() => {
// //     if (hasRange && selectedRange) {
// //       const cells = getRangeCells(selectedRange.start, selectedRange.end);
// //       for (const id of cells) {
// //         decreaseFontSize(id);
// //       }
// //     } else if (selectedCell) {
// //       decreaseFontSize(selectedCell);
// //     }
// //   }, [hasRange, selectedRange, selectedCell, decreaseFontSize, getRangeCells]);

// //   // === ACTIONS PRESSE-PAPIERS ===
// //   const handleCopy = useCallback(() => {
// //     if (selectedRange) {
// //       copyRange(selectedRange.start, selectedRange.end);
// //     } else if (selectedCell) {
// //       // Copier une cellule seule
// //       const data = useStore.getState().cells.get(selectedCell);
// //       if (data) {
// //         const text = data.display || data.value?.toString() || "";
// //         navigator.clipboard?.writeText(text).catch(() => {});
// //       }
// //     }
// //   }, [selectedRange, selectedCell, copyRange]);

// //   const handleCut = useCallback(() => {
// //     if (selectedRange) {
// //       cutRange(selectedRange.start, selectedRange.end);
// //     } else if (selectedCell) {
// //       // Couper une cellule seule
// //       const data = useStore.getState().cells.get(selectedCell);
// //       if (data) {
// //         const text = data.display || data.value?.toString() || "";
// //         navigator.clipboard?.writeText(text).catch(() => {});
// //         const { setCellValue } = useStore.getState();
// //         setCellValue(selectedCell, "");
// //       }
// //     }
// //   }, [selectedRange, selectedCell, cutRange]);

// //   const handlePaste = useCallback(() => {
// //     const clipboardData = getClipboardData();
// //     if (clipboardData && clipboardData.data.length > 0) {
// //       if (selectedCell) {
// //         pasteRange(selectedCell);
// //       }
// //     } else {
// //       // Essayer de coller depuis le presse-papiers système
// //       navigator.clipboard
// //         ?.readText()
// //         .then((text) => {
// //           if (text && selectedCell) {
// //             const lines = text.split("\n");
// //             for (let i = 0; i < lines.length; i++) {
// //               const cells = lines[i].split("\t");
// //               for (let j = 0; j < cells.length; j++) {
// //                 const col = selectedCell.charCodeAt(0) - 65 + j;
// //                 const row = parseInt(selectedCell.substring(1)) + i;
// //                 const id = `${String.fromCharCode(65 + col)}${row}`;
// //                 const { setCellValue } = useStore.getState();
// //                 setCellValue(id, cells[j]);
// //               }
// //             }
// //           }
// //         })
// //         .catch(() => {});
// //     }
// //   }, [selectedCell, getClipboardData, pasteRange]);

// //   // Info de sélection
// //   const getSelectionInfo = useMemo(() => {
// //     if (selectedRange) {
// //       const cells = getRangeCells(selectedRange.start, selectedRange.end);
// //       return `Plage: ${selectedRange.start}:${selectedRange.end} (${cells.length} cellules)`;
// //     }
// //     if (selectedCell) {
// //       return `Cellule: ${selectedCell}`;
// //     }
// //     return "Aucune sélection";
// //   }, [selectedCell, selectedRange, getRangeCells]);

// //   const currentFontSize = getStyleState("fontSize") || 13;
// //   const currentFont = getStyleState("fontFamily") || "Arial";

// //   return (
// //     <>
// //       <div className={styles.toolbar}>
// //         {/* === PRESSE-PAPIERS === */}
// //         <div className={styles.toolbarGroup}>
// //           <button
// //             className={styles.toolbarButton}
// //             onClick={handleCopy}
// //             title="Copier (Ctrl+C)"
// //             disabled={!hasSelection}
// //           >
// //             📄
// //           </button>
// //           <button
// //             className={styles.toolbarButton}
// //             onClick={handleCut}
// //             title="Couper (Ctrl+X)"
// //             disabled={!hasSelection}
// //           >
// //             ✂️
// //           </button>
// //           <button
// //             className={styles.toolbarButton}
// //             onClick={handlePaste}
// //             title="Coller (Ctrl+V)"
// //             disabled={!selectedCell}
// //           >
// //             📋
// //           </button>
// //         </div>

// //         <div className={styles.separator} />

// //         {/* === SÉLECTEUR DE POLICE === */}
// //         <div className={styles.toolbarGroup} ref={fontMenuRef}>
// //           <button
// //             className={styles.toolbarButton}
// //             onClick={() => setShowFontMenu(!showFontMenu)}
// //             title="Police"
// //             style={{ minWidth: 80, justifyContent: "center" }}
// //           >
// //             {/* <span style={{ fontFamily: currentFont }}>{currentFont}</span> */}
// //             <span
// //               style={{
// //                 fontFamily:
// //                   typeof currentFont === "string" ? currentFont : "Arial",
// //               }}
// //             >
// //               {currentFont}
// //             </span>

// //             <span style={{ marginLeft: 4, fontSize: 10 }}>▼</span>
// //           </button>
// //           {showFontMenu && (
// //             <div
// //               className={styles.dropdownMenu}
// //               style={{
// //                 position: "absolute",
// //                 top: 40,
// //                 left: 0,
// //                 zIndex: 100,
// //                 background: "#fff",
// //                 border: "1px solid #dadce0",
// //                 borderRadius: 4,
// //                 boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
// //                 maxHeight: 200,
// //                 overflowY: "auto",
// //                 minWidth: 150,
// //               }}
// //             >
// //               {FONTS.map((font) => (
// //                 <div
// //                   key={font}
// //                   className={`${styles.dropdownItem} ${font === currentFont ? styles.active : ""}`}
// //                   onClick={() => setFont(font)}
// //                   style={{
// //                     fontFamily: font,
// //                     padding: "4px 12px",
// //                     cursor: "pointer",
// //                   }}
// //                 >
// //                   {font}
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         <div className={styles.separator} />

// //         {/* === TAILLE DE POLICE === */}
// //         <div className={styles.toolbarGroup} ref={sizeMenuRef}>
// //           <button
// //             className={styles.toolbarButton}
// //             onClick={() => setShowSizeMenu(!showSizeMenu)}
// //             title="Taille de police"
// //             style={{ minWidth: 40, justifyContent: "center" }}
// //           >
// //             {currentFontSize}
// //             <span style={{ marginLeft: 4, fontSize: 10 }}>▼</span>
// //           </button>
// //           <button
// //             className={styles.toolbarButton}
// //             onClick={handleIncreaseFontSize}
// //             title="Augmenter la taille"
// //           >
// //             A+
// //           </button>
// //           <button
// //             className={styles.toolbarButton}
// //             onClick={handleDecreaseFontSize}
// //             title="Diminuer la taille"
// //           >
// //             A-
// //           </button>
// //           {showSizeMenu && (
// //             <div
// //               className={styles.dropdownMenu}
// //               style={{
// //                 position: "absolute",
// //                 top: 40,
// //                 left: 0,
// //                 zIndex: 100,
// //                 background: "#fff",
// //                 border: "1px solid #dadce0",
// //                 borderRadius: 4,
// //                 boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
// //                 maxHeight: 200,
// //                 overflowY: "auto",
// //                 minWidth: 60,
// //               }}
// //             >
// //               {FONT_SIZES.map((size) => (
// //                 <div
// //                   key={size}
// //                   className={`${styles.dropdownItem} ${size === currentFontSize ? styles.active : ""}`}
// //                   onClick={() => changeFontSize(size)}
// //                   style={{
// //                     padding: "4px 12px",
// //                     cursor: "pointer",
// //                     textAlign: "center",
// //                   }}
// //                 >
// //                   {size}
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         <div className={styles.separator} />

// //         {/* === STYLES DE TEXTE === */}
// //         <div className={styles.toolbarGroup}>
// //           <button
// //             className={`${styles.toolbarButton} ${getStyleState("bold") ? styles.active : ""}`}
// //             onClick={toggleBold}
// //             title="Gras (Ctrl+B)"
// //           >
// //             <strong>B</strong>
// //           </button>
// //           <button
// //             className={`${styles.toolbarButton} ${getStyleState("italic") ? styles.active : ""}`}
// //             onClick={toggleItalic}
// //             title="Italique (Ctrl+I)"
// //           >
// //             <em>I</em>
// //           </button>
// //           <button
// //             className={`${styles.toolbarButton} ${getStyleState("underline") ? styles.active : ""}`}
// //             onClick={toggleUnderline}
// //             title="Souligné (Ctrl+U)"
// //           >
// //             <u>U</u>
// //           </button>
// //           <button
// //             className={`${styles.toolbarButton} ${getStyleState("strikethrough") ? styles.active : ""}`}
// //             onClick={toggleStrikethrough}
// //             title="Barré"
// //           >
// //             <span style={{ textDecoration: "line-through" }}>S</span>
// //           </button>
// //         </div>

// //         <div className={styles.separator} />

// //         {/* === ALIGNEMENT === */}
// //         <div className={styles.toolbarGroup}>
// //           <button
// //             className={`${styles.toolbarButton} ${getStyleState("align") === "left" ? styles.active : ""}`}
// //             onClick={() => setAlignment("left")}
// //             title="Aligner à gauche"
// //           >
// //             ≡
// //           </button>
// //           <button
// //             className={`${styles.toolbarButton} ${getStyleState("align") === "center" ? styles.active : ""}`}
// //             onClick={() => setAlignment("center")}
// //             title="Centrer"
// //           >
// //             ☰
// //           </button>
// //           <button
// //             className={`${styles.toolbarButton} ${getStyleState("align") === "right" ? styles.active : ""}`}
// //             onClick={() => setAlignment("right")}
// //             title="Aligner à droite"
// //           >
// //             ≡
// //           </button>
// //         </div>

// //         <div className={styles.separator} />

// //         {/* === COULEURS === */}
// //         <div className={styles.toolbarGroup}>
// //           <div className={styles.colorPickerWrapper}>
// //             <span className={styles.colorLabel}>🎨</span>
// //             <input
// //               type="color"
// //               value={cellData?.style?.bgColor || "#ffffff"}
// //               onChange={(e) => setBgColor(e.target.value)}
// //               className={styles.colorPicker}
// //               title="Couleur de fond"
// //             />
// //           </div>
// //           <div className={styles.colorPickerWrapper}>
// //             <span className={styles.colorLabel} style={{ fontWeight: "bold" }}>
// //               A
// //             </span>
// //             <input
// //               type="color"
// //               value={cellData?.style?.textColor || "#000000"}
// //               onChange={(e) => setTextColor(e.target.value)}
// //               className={styles.colorPicker}
// //               title="Couleur du texte"
// //             />
// //           </div>
// //         </div>

// //         <div className={styles.separator} />

// //         {/* === SÉLECTEUR DE PLAGE === */}
// //         <div className={styles.toolbarGroup}>
// //           <button
// //             className={`${styles.toolbarButton} ${hasRange ? styles.active : ""}`}
// //             onClick={() => setShowRangeSelector(!showRangeSelector)}
// //             title="Sélectionner une plage"
// //           >
// //             📊
// //           </button>
// //           {hasRange && (
// //             <button
// //               className={`${styles.toolbarButton} ${styles.danger}`}
// //               onClick={() => {
// //                 if (
// //                   selectedRange &&
// //                   confirm(
// //                     `Vider la plage ${selectedRange.start}:${selectedRange.end} ?`,
// //                   )
// //                 ) {
// //                   clearRange(selectedRange.start, selectedRange.end);
// //                 }
// //               }}
// //               title="Vider la plage"
// //             >
// //               🗑️
// //             </button>
// //           )}
// //         </div>

// //         {/* === INFO === */}
// //         <div className={styles.toolbarGroup} style={{ marginLeft: "auto" }}>
// //           <span className={styles.cellInfo}>
// //             {getSelectionInfo}
// //             {hasRange && selectedRange && (
// //               <span
// //                 style={{ marginLeft: 8, color: "#34a853", fontSize: "11px" }}
// //               >
// //                 {getRangeCells(selectedRange.start, selectedRange.end).length}{" "}
// //                 cellules
// //               </span>
// //             )}
// //           </span>
// //         </div>
// //       </div>

// //       {showRangeSelector && (
// //         <div className={styles.rangeSelectorOverlay}>
// //           <RangeSelector
// //             onRangeSelect={(start, end) => {
// //               selectRange(start, end);
// //               setShowRangeSelector(false);
// //             }}
// //             onClose={() => setShowRangeSelector(false)}
// //           />
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // src/components/spreadsheet/toolbar/Toolbar.tsx

// "use client";

// import { useState, useCallback, useMemo, useRef, useEffect } from "react";
// import { useStore } from "@/src/store/spreadsheetstore";
// import styles from "./Toolbar.module.css";
// import { CellStyle } from "@/src/store/types";
// import { RangeSelector } from "../range/RangeSelector";

// // Polices disponibles
// const FONTS = [
//   "Arial",
//   "Helvetica",
//   "Times New Roman",
//   "Courier New",
//   "Georgia",
//   "Verdana",
//   "Tahoma",
//   "Trebuchet MS",
//   "Impact",
//   "Comic Sans MS",
// ];

// // Tailles de police disponibles
// const FONT_SIZES = [
//   8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 28, 32, 36, 48, 72,
// ];

// export const ToolBar = () => {
//   const [showRangeSelector, setShowRangeSelector] = useState(false);
//   const [showFontMenu, setShowFontMenu] = useState(false);
//   const [showSizeMenu, setShowSizeMenu] = useState(false);
//   const fontMenuRef = useRef<HTMLDivElement>(null);
//   const sizeMenuRef = useRef<HTMLDivElement>(null);

//   const selectedCell = useStore((state) => state.selectedCell);
//   const selectedRange = useStore((state) => state.selectedRange);
//   const cellData = useStore((state) =>
//     selectedCell ? state.cells.get(selectedCell) : null,
//   );
//   const setCellStyle = useStore((state) => state.setCellStyle);
//   const applyStyleToRange = useStore((state) => state.applyStyleToRange);
//   const clearRange = useStore((state) => state.clearRange);
//   const selectRange = useStore((state) => state.selectRange);
//   const copyRange = useStore((state) => state.copyRange);
//   const cutRange = useStore((state) => state.cutRange);
//   const pasteRange = useStore((state) => state.pasteRange);
//   const getClipboardData = useStore((state) => state.getClipboardData);
//   const clearClipboard = useStore((state) => state.clearClipboard);
//   const increaseFontSize = useStore((state) => state.increaseFontSize);
//   const decreaseFontSize = useStore((state) => state.decreaseFontSize);
//   const setFontFamily = useStore((state) => state.setFontFamily);
//   const getRangeCells = useStore((state) => state.getRangeCells);

//   const hasRange = !!selectedRange;
//   const hasSelection = !!selectedCell || hasRange;

//   // Fermer les menus au clic extérieur
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         fontMenuRef.current &&
//         !fontMenuRef.current.contains(e.target as Node)
//       ) {
//         setShowFontMenu(false);
//       }
//       if (
//         sizeMenuRef.current &&
//         !sizeMenuRef.current.contains(e.target as Node)
//       ) {
//         setShowSizeMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Appliquer le style à la plage ou à la cellule
//   const applyStyle = useCallback(
//     (style: Partial<CellStyle>) => {
//       if (hasRange && selectedRange) {
//         applyStyleToRange(selectedRange.start, selectedRange.end, style);
//       } else if (selectedCell) {
//         setCellStyle(selectedCell, style);
//       }
//     },
//     [hasRange, selectedRange, selectedCell, applyStyleToRange, setCellStyle],
//   );

//   // Obtenir l'état du style
//   const getStyleState = useCallback(
//     (key: keyof CellStyle) => {
//       if (hasRange && selectedRange) {
//         const cells = getRangeCells(selectedRange.start, selectedRange.end);
//         const styles = cells.map((id) => {
//           const data = useStore.getState().cells.get(id);
//           return data?.style?.[key];
//         });
//         const uniqueStyles = [...new Set(styles)];
//         if (uniqueStyles.length === 1) {
//           return uniqueStyles[0];
//         }
//         return undefined;
//       }
//       return cellData?.style?.[key];
//     },
//     [hasRange, selectedRange, cellData, getRangeCells],
//   );

//   // === ACTIONS DE STYLE ===
//   const toggleBold = useCallback(() => {
//     const current = getStyleState("bold");
//     applyStyle({ bold: !current });
//   }, [getStyleState, applyStyle]);

//   const toggleItalic = useCallback(() => {
//     const current = getStyleState("italic");
//     applyStyle({ italic: !current });
//   }, [getStyleState, applyStyle]);

//   const toggleUnderline = useCallback(() => {
//     const current = getStyleState("underline");
//     applyStyle({ underline: !current });
//   }, [getStyleState, applyStyle]);

//   const toggleStrikethrough = useCallback(() => {
//     const current = getStyleState("strikethrough");
//     applyStyle({ strikethrough: !current });
//   }, [getStyleState, applyStyle]);

//   const setAlignment = useCallback(
//     (align: "left" | "center" | "right") => {
//       applyStyle({ align });
//     },
//     [applyStyle],
//   );

//   const setBgColor = useCallback(
//     (color: string) => {
//       applyStyle({ bgColor: color });
//     },
//     [applyStyle],
//   );

//   const setTextColor = useCallback(
//     (color: string) => {
//       applyStyle({ textColor: color });
//     },
//     [applyStyle],
//   );

//   const setFont = useCallback(
//     (fontFamily: string) => {
//       if (hasRange && selectedRange) {
//         const cells = getRangeCells(selectedRange.start, selectedRange.end);
//         for (const id of cells) {
//           setFontFamily(id, fontFamily);
//         }
//       } else if (selectedCell) {
//         setFontFamily(selectedCell, fontFamily);
//       }
//       setShowFontMenu(false);
//     },
//     [hasRange, selectedRange, selectedCell, setFontFamily, getRangeCells],
//   );

//   const changeFontSize = useCallback(
//     (size: number) => {
//       applyStyle({ fontSize: size });
//       setShowSizeMenu(false);
//     },
//     [applyStyle],
//   );

//   const handleIncreaseFontSize = useCallback(() => {
//     if (hasRange && selectedRange) {
//       const cells = getRangeCells(selectedRange.start, selectedRange.end);
//       for (const id of cells) {
//         increaseFontSize(id);
//       }
//     } else if (selectedCell) {
//       increaseFontSize(selectedCell);
//     }
//   }, [hasRange, selectedRange, selectedCell, increaseFontSize, getRangeCells]);

//   const handleDecreaseFontSize = useCallback(() => {
//     if (hasRange && selectedRange) {
//       const cells = getRangeCells(selectedRange.start, selectedRange.end);
//       for (const id of cells) {
//         decreaseFontSize(id);
//       }
//     } else if (selectedCell) {
//       decreaseFontSize(selectedCell);
//     }
//   }, [hasRange, selectedRange, selectedCell, decreaseFontSize, getRangeCells]);

//   // === ACTIONS PRESSE-PAPIERS ===
//   const handleCopy = useCallback(() => {
//     if (selectedRange) {
//       copyRange(selectedRange.start, selectedRange.end);
//     } else if (selectedCell) {
//       const data = useStore.getState().cells.get(selectedCell);
//       if (data) {
//         const text = data.display || data.value?.toString() || "";
//         navigator.clipboard?.writeText(text).catch(() => {});
//       }
//     }
//   }, [selectedRange, selectedCell, copyRange]);

//   const handleCut = useCallback(() => {
//     if (selectedRange) {
//       cutRange(selectedRange.start, selectedRange.end);
//     } else if (selectedCell) {
//       const data = useStore.getState().cells.get(selectedCell);
//       if (data) {
//         const text = data.display || data.value?.toString() || "";
//         navigator.clipboard?.writeText(text).catch(() => {});
//         const { setCellValue } = useStore.getState();
//         setCellValue(selectedCell, "");
//       }
//     }
//   }, [selectedRange, selectedCell, cutRange]);

//   const handlePaste = useCallback(() => {
//     const clipboardData = getClipboardData();
//     if (clipboardData && clipboardData.data.length > 0) {
//       if (selectedCell) {
//         pasteRange(selectedCell);
//       }
//     } else {
//       navigator.clipboard
//         ?.readText()
//         .then((text) => {
//           if (text && selectedCell) {
//             const lines = text.split("\n");
//             for (let i = 0; i < lines.length; i++) {
//               const cells = lines[i].split("\t");
//               for (let j = 0; j < cells.length; j++) {
//                 const col = selectedCell.charCodeAt(0) - 65 + j;
//                 const row = parseInt(selectedCell.substring(1)) + i;
//                 const id = `${String.fromCharCode(65 + col)}${row}`;
//                 const { setCellValue } = useStore.getState();
//                 setCellValue(id, cells[j]);
//               }
//             }
//           }
//         })
//         .catch(() => {});
//     }
//   }, [selectedCell, getClipboardData, pasteRange]);

//   // === RACCOURCIS CLAVIER ===
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Ctrl/Cmd + C
//       if ((e.ctrlKey || e.metaKey) && e.key === "c") {
//         e.preventDefault();
//         handleCopy();
//       }
//       // Ctrl/Cmd + X
//       if ((e.ctrlKey || e.metaKey) && e.key === "x") {
//         e.preventDefault();
//         handleCut();
//       }
//       // Ctrl/Cmd + V
//       if ((e.ctrlKey || e.metaKey) && e.key === "v") {
//         e.preventDefault();
//         handlePaste();
//       }
//       // Ctrl/Cmd + B
//       if ((e.ctrlKey || e.metaKey) && e.key === "b") {
//         e.preventDefault();
//         toggleBold();
//       }
//       // Ctrl/Cmd + I
//       if ((e.ctrlKey || e.metaKey) && e.key === "i") {
//         e.preventDefault();
//         toggleItalic();
//       }
//       // Ctrl/Cmd + U
//       if ((e.ctrlKey || e.metaKey) && e.key === "u") {
//         e.preventDefault();
//         toggleUnderline();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [
//     handleCopy,
//     handleCut,
//     handlePaste,
//     toggleBold,
//     toggleItalic,
//     toggleUnderline,
//   ]);

//   // Info de sélection
//   const getSelectionInfo = useMemo(() => {
//     if (selectedRange) {
//       const cells = getRangeCells(selectedRange.start, selectedRange.end);
//       return `Plage: ${selectedRange.start}:${selectedRange.end} (${cells.length} cellules)`;
//     }
//     if (selectedCell) {
//       return `Cellule: ${selectedCell}`;
//     }
//     return "Aucune sélection";
//   }, [selectedCell, selectedRange, getRangeCells]);

//   const currentFontSize = getStyleState("fontSize") || 13;
//   const currentFont = getStyleState("fontFamily") || "Arial";

//   return (
//     <>
//       <div className={styles.toolbar}>
//         {/* === PRESSE-PAPIERS === */}
//         <div className={styles.toolbarGroup}>
//           <button
//             className={styles.toolbarButton}
//             onClick={handleCopy}
//             title="Copier (Ctrl+C)"
//             disabled={!hasSelection}
//           >
//             📄
//           </button>
//           <button
//             className={styles.toolbarButton}
//             onClick={handleCut}
//             title="Couper (Ctrl+X)"
//             disabled={!hasSelection}
//           >
//             ✂️
//           </button>
//           <button
//             className={styles.toolbarButton}
//             onClick={handlePaste}
//             title="Coller (Ctrl+V)"
//             disabled={!selectedCell}
//           >
//             📋
//           </button>
//         </div>

//         <div className={styles.separator} />

//         {/* === SÉLECTEUR DE POLICE === */}
//         <div
//           className={styles.toolbarGroup}
//           ref={fontMenuRef}
//           style={{ position: "relative" }}
//         >
//           <button
//             className={styles.toolbarButton}
//             onClick={() => setShowFontMenu(!showFontMenu)}
//             title="Police"
//             style={{ minWidth: 80, justifyContent: "center" }}
//           >
//             <span
//               style={{
//                 fontFamily:
//                   typeof currentFont === "string" ? currentFont : "Arial",
//               }}
//             >
//               {currentFont}
//             </span>
//             <span style={{ marginLeft: 4, fontSize: 10 }}>▼</span>
//           </button>
//           {showFontMenu && (
//             <div className={styles.dropdownMenu}>
//               {FONTS.map((font) => (
//                 <div
//                   key={font}
//                   className={`${styles.dropdownItem} ${font === currentFont ? styles.active : ""}`}
//                   onClick={() => setFont(font)}
//                   style={{ fontFamily: font }}
//                 >
//                   {font}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className={styles.separator} />

//         {/* === TAILLE DE POLICE === */}
//         <div
//           className={styles.toolbarGroup}
//           ref={sizeMenuRef}
//           style={{ position: "relative" }}
//         >
//           <button
//             className={styles.toolbarButton}
//             onClick={() => setShowSizeMenu(!showSizeMenu)}
//             title="Taille de police"
//             style={{ minWidth: 40, justifyContent: "center" }}
//           >
//             {currentFontSize}
//             <span style={{ marginLeft: 4, fontSize: 10 }}>▼</span>
//           </button>
//           <button
//             className={styles.toolbarButton}
//             onClick={handleIncreaseFontSize}
//             title="Augmenter la taille"
//           >
//             A+
//           </button>
//           <button
//             className={styles.toolbarButton}
//             onClick={handleDecreaseFontSize}
//             title="Diminuer la taille"
//           >
//             A-
//           </button>
//           {showSizeMenu && (
//             <div className={styles.dropdownMenu} style={{ minWidth: 60 }}>
//               {FONT_SIZES.map((size) => (
//                 <div
//                   key={size}
//                   className={`${styles.dropdownItem} ${size === currentFontSize ? styles.active : ""}`}
//                   onClick={() => changeFontSize(size)}
//                   style={{ textAlign: "center" }}
//                 >
//                   {size}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className={styles.separator} />

//         {/* === STYLES DE TEXTE === */}
//         <div className={styles.toolbarGroup}>
//           <button
//             className={`${styles.toolbarButton} ${getStyleState("bold") ? styles.active : ""}`}
//             onClick={toggleBold}
//             title="Gras (Ctrl+B)"
//           >
//             <strong>B</strong>
//           </button>
//           <button
//             className={`${styles.toolbarButton} ${getStyleState("italic") ? styles.active : ""}`}
//             onClick={toggleItalic}
//             title="Italique (Ctrl+I)"
//           >
//             <em>I</em>
//           </button>
//           <button
//             className={`${styles.toolbarButton} ${getStyleState("underline") ? styles.active : ""}`}
//             onClick={toggleUnderline}
//             title="Souligné (Ctrl+U)"
//           >
//             <u>U</u>
//           </button>
//           <button
//             className={`${styles.toolbarButton} ${getStyleState("strikethrough") ? styles.active : ""}`}
//             onClick={toggleStrikethrough}
//             title="Barré"
//           >
//             <span style={{ textDecoration: "line-through" }}>S</span>
//           </button>
//         </div>

//         <div className={styles.separator} />

//         {/* === ALIGNEMENT === */}
//         <div className={styles.toolbarGroup}>
//           <button
//             className={`${styles.toolbarButton} ${getStyleState("align") === "left" ? styles.active : ""}`}
//             onClick={() => setAlignment("left")}
//             title="Aligner à gauche"
//           >
//             ≡
//           </button>
//           <button
//             className={`${styles.toolbarButton} ${getStyleState("align") === "center" ? styles.active : ""}`}
//             onClick={() => setAlignment("center")}
//             title="Centrer"
//           >
//             ☰
//           </button>
//           <button
//             className={`${styles.toolbarButton} ${getStyleState("align") === "right" ? styles.active : ""}`}
//             onClick={() => setAlignment("right")}
//             title="Aligner à droite"
//           >
//             ≡
//           </button>
//         </div>

//         <div className={styles.separator} />

//         {/* === COULEURS === */}
//         <div className={styles.toolbarGroup}>
//           <div className={styles.colorPickerWrapper}>
//             <span className={styles.colorLabel}>🎨</span>
//             <input
//               type="color"
//               value={cellData?.style?.bgColor || "#ffffff"}
//               onChange={(e) => setBgColor(e.target.value)}
//               className={styles.colorPicker}
//               title="Couleur de fond"
//             />
//           </div>
//           <div className={styles.colorPickerWrapper}>
//             <span className={styles.colorLabel} style={{ fontWeight: "bold" }}>
//               A
//             </span>
//             <input
//               type="color"
//               value={cellData?.style?.textColor || "#000000"}
//               onChange={(e) => setTextColor(e.target.value)}
//               className={styles.colorPicker}
//               title="Couleur du texte"
//             />
//           </div>
//         </div>

//         <div className={styles.separator} />

//         {/* === SÉLECTEUR DE PLAGE === */}
//         <div className={styles.toolbarGroup}>
//           <button
//             className={`${styles.toolbarButton} ${hasRange ? styles.active : ""}`}
//             onClick={() => setShowRangeSelector(!showRangeSelector)}
//             title="Sélectionner une plage"
//           >
//             📊
//           </button>
//           {hasRange && (
//             <button
//               className={`${styles.toolbarButton} ${styles.danger}`}
//               onClick={() => {
//                 if (
//                   selectedRange &&
//                   confirm(
//                     `Vider la plage ${selectedRange.start}:${selectedRange.end} ?`,
//                   )
//                 ) {
//                   clearRange(selectedRange.start, selectedRange.end);
//                 }
//               }}
//               title="Vider la plage"
//             >
//               🗑️
//             </button>
//           )}
//         </div>

//         {/* === INFO === */}
//         <div className={styles.toolbarGroup} style={{ marginLeft: "auto" }}>
//           <span className={styles.cellInfo}>
//             {getSelectionInfo}
//             {hasRange && selectedRange && (
//               <span
//                 style={{ marginLeft: 8, color: "#34a853", fontSize: "11px" }}
//               >
//                 {getRangeCells(selectedRange.start, selectedRange.end).length}{" "}
//                 cellules
//               </span>
//             )}
//           </span>
//         </div>
//       </div>

//       {showRangeSelector && (
//         <div className={styles.rangeSelectorOverlay}>
//           <RangeSelector
//             onRangeSelect={(start, end) => {
//               selectRange(start, end);
//               setShowRangeSelector(false);
//             }}
//             onClose={() => setShowRangeSelector(false)}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// src/components/spreadsheet/toolbar/Toolbar.tsx
// src/components/spreadsheet/toolbar/Toolbar.tsx

"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useStore } from "@/src/store/spreadsheetstore";
import styles from "./Toolbar.module.css";
import { CellStyle } from "@/src/store/types";
import { RangeSelector } from "../range/RangeSelector";
// ⚠️ CORRECTION : Le chemin doit pointer vers le bon fichier

// Polices disponibles
const FONTS = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Impact",
  "Comic Sans MS",
];

// Tailles de police disponibles
const FONT_SIZES = [
  8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 28, 32, 36, 48, 72,
];

export const ToolBar = () => {
  const [showRangeSelector, setShowRangeSelector] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const fontMenuRef = useRef<HTMLDivElement>(null);
  const sizeMenuRef = useRef<HTMLDivElement>(null);

  // ============ RÉCUPÉRATION DES DONNÉES DU STORE ============
  const selectedCell = useStore((state) => state.selectedCell);
  const selectedRange = useStore((state) => state.selectedRange);
  const cellData = useStore((state) =>
    selectedCell ? state.cells.get(selectedCell) : null,
  );

  // Actions
  const setCellStyle = useStore((state) => state.setCellStyle);
  const applyStyleToRange = useStore((state) => state.applyStyleToRange);
  const clearRange = useStore((state) => state.clearRange);
  const selectRange = useStore((state) => state.selectRange);
  const copyRange = useStore((state) => state.copyRange);
  const cutRange = useStore((state) => state.cutRange);
  const pasteRange = useStore((state) => state.pasteRange);
  const getClipboardData = useStore((state) => state.getClipboardData);
  const increaseFontSize = useStore((state) => state.increaseFontSize);
  const decreaseFontSize = useStore((state) => state.decreaseFontSize);
  const setFontFamily = useStore((state) => state.setFontFamily);
  const getRangeCells = useStore((state) => state.getRangeCells);

  const hasRange = !!selectedRange;
  const hasSelection = !!selectedCell || hasRange;

  // ============ FERMER LES MENUS AU CLIC EXTÉRIEUR ============
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        fontMenuRef.current &&
        !fontMenuRef.current.contains(e.target as Node)
      ) {
        setShowFontMenu(false);
      }
      if (
        sizeMenuRef.current &&
        !sizeMenuRef.current.contains(e.target as Node)
      ) {
        setShowSizeMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ============ APPLIQUER LE STYLE ============
  const applyStyle = useCallback(
    (style: Partial<CellStyle>) => {
      if (hasRange && selectedRange) {
        applyStyleToRange(selectedRange.start, selectedRange.end, style);
      } else if (selectedCell) {
        setCellStyle(selectedCell, style);
      }
    },
    [hasRange, selectedRange, selectedCell, applyStyleToRange, setCellStyle],
  );

  // ============ OBTENIR L'ÉTAT DU STYLE ============
  const getStyleState = useCallback(
    (key: keyof CellStyle) => {
      if (hasRange && selectedRange) {
        const cells = getRangeCells(selectedRange.start, selectedRange.end);
        const styles = cells.map((id) => {
          const data = useStore.getState().cells.get(id);
          return data?.style?.[key];
        });
        const uniqueStyles = [...new Set(styles)];
        if (uniqueStyles.length === 1) {
          return uniqueStyles[0];
        }
        return undefined;
      }
      return cellData?.style?.[key];
    },
    [hasRange, selectedRange, cellData, getRangeCells],
  );

  // ============ ACTIONS DE STYLE ============
  const toggleBold = useCallback(() => {
    const current = getStyleState("bold");
    applyStyle({ bold: !current });
  }, [getStyleState, applyStyle]);

  const toggleItalic = useCallback(() => {
    const current = getStyleState("italic");
    applyStyle({ italic: !current });
  }, [getStyleState, applyStyle]);

  const toggleUnderline = useCallback(() => {
    const current = getStyleState("underline");
    applyStyle({ underline: !current });
  }, [getStyleState, applyStyle]);

  const toggleStrikethrough = useCallback(() => {
    const current = getStyleState("strikethrough");
    applyStyle({ strikethrough: !current });
  }, [getStyleState, applyStyle]);

  const setAlignment = useCallback(
    (align: "left" | "center" | "right") => {
      applyStyle({ align });
    },
    [applyStyle],
  );

  const setBgColor = useCallback(
    (color: string) => {
      applyStyle({ bgColor: color });
    },
    [applyStyle],
  );

  const setTextColor = useCallback(
    (color: string) => {
      applyStyle({ textColor: color });
    },
    [applyStyle],
  );

  // ============ POLICES ============
  const setFont = useCallback(
    (fontFamily: string) => {
      if (hasRange && selectedRange) {
        const cells = getRangeCells(selectedRange.start, selectedRange.end);
        for (const id of cells) {
          setFontFamily(id, fontFamily);
        }
      } else if (selectedCell) {
        setFontFamily(selectedCell, fontFamily);
      }
      setShowFontMenu(false);
    },
    [hasRange, selectedRange, selectedCell, setFontFamily, getRangeCells],
  );

  //   const changeFontSize = useCallback(
  //     (size: number) => {
  //       applyStyle({ fontSize: size });
  //       setShowSizeMenu(false);
  //     },
  //     [applyStyle],
  //   );

  //   const handleIncreaseFontSize = useCallback(() => {
  //     if (hasRange && selectedRange) {
  //       const cells = getRangeCells(selectedRange.start, selectedRange.end);
  //       for (const id of cells) {
  //         increaseFontSize(id);
  //       }
  //     } else if (selectedCell) {
  //       increaseFontSize(selectedCell);
  //     }
  //   }, [hasRange, selectedRange, selectedCell, increaseFontSize, getRangeCells]);

  //   const handleDecreaseFontSize = useCallback(() => {
  //     if (hasRange && selectedRange) {
  //       const cells = getRangeCells(selectedRange.start, selectedRange.end);
  //       for (const id of cells) {
  //         decreaseFontSize(id);
  //       }
  //     } else if (selectedCell) {
  //       decreaseFontSize(selectedCell);
  //     }
  //   }, [hasRange, selectedRange, selectedCell, decreaseFontSize, getRangeCells]);

  // ============ TAILLE DE POLICE ============

  /**
   * Change la taille de police pour toute la plage ou la cellule
   */
  const changeFontSize = useCallback(
    (size: number) => {
      applyStyle({ fontSize: size });
      setShowSizeMenu(false);
    },
    [applyStyle],
  );

  /**
   * Augmente la taille de police
   */
  const handleIncreaseFontSize = useCallback(() => {
    if (hasRange && selectedRange) {
      const cells = getRangeCells(selectedRange.start, selectedRange.end);
      for (const id of cells) {
        increaseFontSize(id);
      }
    } else if (selectedCell) {
      increaseFontSize(selectedCell);
    }
  }, [hasRange, selectedRange, selectedCell, increaseFontSize, getRangeCells]);

  /**
   * Diminue la taille de police
   */
  const handleDecreaseFontSize = useCallback(() => {
    if (hasRange && selectedRange) {
      const cells = getRangeCells(selectedRange.start, selectedRange.end);
      for (const id of cells) {
        decreaseFontSize(id);
      }
    } else if (selectedCell) {
      decreaseFontSize(selectedCell);
    }
  }, [hasRange, selectedRange, selectedCell, decreaseFontSize, getRangeCells]);

  // ============ PRESSE-PAPIERS ============
  const handleCopy = useCallback(() => {
    if (selectedRange) {
      copyRange(selectedRange.start, selectedRange.end);
    } else if (selectedCell) {
      const data = useStore.getState().cells.get(selectedCell);
      if (data) {
        const text = data.display || data.value?.toString() || "";
        navigator.clipboard?.writeText(text).catch(() => {});
      }
    }
  }, [selectedRange, selectedCell, copyRange]);

  const handleCut = useCallback(() => {
    if (selectedRange) {
      cutRange(selectedRange.start, selectedRange.end);
    } else if (selectedCell) {
      const data = useStore.getState().cells.get(selectedCell);
      if (data) {
        const text = data.display || data.value?.toString() || "";
        navigator.clipboard?.writeText(text).catch(() => {});
        const { setCellValue } = useStore.getState();
        setCellValue(selectedCell, "");
      }
    }
  }, [selectedRange, selectedCell, cutRange]);

  const handlePaste = useCallback(() => {
    const clipboardData = getClipboardData();
    if (clipboardData && clipboardData.data.length > 0) {
      if (selectedCell) {
        pasteRange(selectedCell);
      }
    } else {
      navigator.clipboard
        ?.readText()
        .then((text) => {
          if (text && selectedCell) {
            const lines = text.split("\n").filter((row) => row.trim() !== "");
            const targetCol = selectedCell.charCodeAt(0) - 65;
            const targetRow = parseInt(selectedCell.substring(1));

            for (let i = 0; i < lines.length; i++) {
              const cells = lines[i].split("\t");
              for (let j = 0; j < cells.length; j++) {
                const col = targetCol + j;
                const row = targetRow + i;
                const id = `${String.fromCharCode(65 + col)}${row}`;
                const { setCellValue } = useStore.getState();
                setCellValue(id, cells[j]);
              }
            }
          }
        })
        .catch(() => {});
    }
  }, [selectedCell, getClipboardData, pasteRange]);

  // ============ RACCOURCIS CLAVIER ============
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + C
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        handleCopy();
      }
      // Ctrl/Cmd + X
      if ((e.ctrlKey || e.metaKey) && e.key === "x") {
        e.preventDefault();
        handleCut();
      }
      // Ctrl/Cmd + V
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault();
        handlePaste();
      }
      // Ctrl/Cmd + B
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        toggleBold();
      }
      // Ctrl/Cmd + I
      if ((e.ctrlKey || e.metaKey) && e.key === "i") {
        e.preventDefault();
        toggleItalic();
      }
      // Ctrl/Cmd + U
      if ((e.ctrlKey || e.metaKey) && e.key === "u") {
        e.preventDefault();
        toggleUnderline();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    handleCopy,
    handleCut,
    handlePaste,
    toggleBold,
    toggleItalic,
    toggleUnderline,
  ]);

  // ============ INFO DE SÉLECTION ============
  const getSelectionInfo = useMemo(() => {
    if (selectedRange) {
      const cells = getRangeCells(selectedRange.start, selectedRange.end);
      return `Plage: ${selectedRange.start}:${selectedRange.end} (${cells.length} cellules)`;
    }
    if (selectedCell) {
      return `Cellule: ${selectedCell}`;
    }
    return "Aucune sélection";
  }, [selectedCell, selectedRange, getRangeCells]);

  const currentFontSize = getStyleState("fontSize") || 13;
  const currentFont = getStyleState("fontFamily") || "Arial";

  // ============ RENDU ============
  return (
    <>
      <div className={styles.toolbar}>
        {/* === PRESSE-PAPIERS === */}
        <div className={styles.toolbarGroup}>
          <button
            className={styles.toolbarButton}
            onClick={handleCopy}
            title="Copier (Ctrl+C)"
            disabled={!hasSelection}
          >
            📄
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleCut}
            title="Couper (Ctrl+X)"
            disabled={!hasSelection}
          >
            ✂️
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handlePaste}
            title="Coller (Ctrl+V)"
            disabled={!selectedCell}
          >
            📋
          </button>
        </div>

        <div className={styles.separator} />

        {/* === SÉLECTEUR DE POLICE === */}
        <div
          className={styles.toolbarGroup}
          ref={fontMenuRef}
          style={{ position: "relative" }}
        >
          <button
            className={styles.toolbarButton}
            onClick={() => setShowFontMenu(!showFontMenu)}
            title="Police"
            style={{ minWidth: 80, justifyContent: "center" }}
          >
            <span
              style={{
                fontFamily:
                  typeof currentFont === "string" ? currentFont : "Arial",
              }}
            >
              {currentFont}
            </span>
            <span style={{ marginLeft: 4, fontSize: 10 }}>▼</span>
          </button>
          {showFontMenu && (
            <div className={styles.dropdownMenu}>
              {FONTS.map((font) => (
                <div
                  key={font}
                  className={`${styles.dropdownItem} ${font === currentFont ? styles.active : ""}`}
                  onClick={() => setFont(font)}
                  style={{
                    fontFamily: font,
                    padding: "4px 12px",
                    cursor: "pointer",
                  }}
                >
                  {font}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.separator} />

        {/* === TAILLE DE POLICE === */}
        {/* <div
          className={styles.toolbarGroup}
          ref={sizeMenuRef}
          style={{ position: "relative" }}
        >
          <button
            className={styles.toolbarButton}
            onClick={() => setShowSizeMenu(!showSizeMenu)}
            title="Taille de police"
            style={{ minWidth: 40, justifyContent: "center" }}
          >
            {currentFontSize}
            <span style={{ marginLeft: 4, fontSize: 10 }}>▼</span>
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleIncreaseFontSize}
            title="Augmenter la taille"
          >
            A+
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleDecreaseFontSize}
            title="Diminuer la taille"
          >
            A-
          </button>
          {showSizeMenu && (
            <div className={styles.dropdownMenu} style={{ minWidth: 60 }}>
              {FONT_SIZES.map((size) => (
                <div
                  key={size}
                  className={`${styles.dropdownItem} ${size === currentFontSize ? styles.active : ""}`}
                  onClick={() => changeFontSize(size)}
                  style={{
                    padding: "4px 12px",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {size}
                </div>
              ))}
            </div>
          )}
        </div> */}
        {/* === TAILLE DE POLICE === */}
        <div
          className={styles.toolbarGroup}
          ref={sizeMenuRef}
          style={{ position: "relative" }}
        >
          <button
            className={styles.toolbarButton}
            onClick={() => setShowSizeMenu(!showSizeMenu)}
            title="Taille de police"
            style={{ minWidth: 40, justifyContent: "center" }}
          >
            {currentFontSize}
            <span style={{ marginLeft: 4, fontSize: 10 }}>▼</span>
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleIncreaseFontSize}
            title="Augmenter la taille (Ctrl+Shift+>)"
          >
            <span style={{ fontSize: 14 }}>A</span>
            <span style={{ fontSize: 18, fontWeight: "bold" }}>+</span>
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleDecreaseFontSize}
            title="Diminuer la taille (Ctrl+Shift+<)"
          >
            <span style={{ fontSize: 14 }}>A</span>
            <span style={{ fontSize: 18, fontWeight: "bold" }}>−</span>
          </button>
          {showSizeMenu && (
            <div
              className={styles.dropdownMenu}
              style={{ minWidth: 60, maxHeight: 200, overflowY: "auto" }}
            >
              {FONT_SIZES.map((size) => (
                <div
                  key={size}
                  className={`${styles.dropdownItem} ${size === currentFontSize ? styles.active : ""}`}
                  onClick={() => changeFontSize(size)}
                  style={{
                    padding: "4px 12px",
                    cursor: "pointer",
                    textAlign: "center",
                    fontSize: size > 20 ? `${size}px` : "13px",
                  }}
                >
                  {size}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.separator} />

        {/* === STYLES DE TEXTE === */}
        <div className={styles.toolbarGroup}>
          <button
            className={`${styles.toolbarButton} ${getStyleState("bold") ? styles.active : ""}`}
            onClick={toggleBold}
            title="Gras (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            className={`${styles.toolbarButton} ${getStyleState("italic") ? styles.active : ""}`}
            onClick={toggleItalic}
            title="Italique (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            className={`${styles.toolbarButton} ${getStyleState("underline") ? styles.active : ""}`}
            onClick={toggleUnderline}
            title="Souligné (Ctrl+U)"
          >
            <u>U</u>
          </button>
          <button
            className={`${styles.toolbarButton} ${getStyleState("strikethrough") ? styles.active : ""}`}
            onClick={toggleStrikethrough}
            title="Barré"
          >
            <span style={{ textDecoration: "line-through" }}>S</span>
          </button>
        </div>

        <div className={styles.separator} />

        {/* === ALIGNEMENT === */}
        <div className={styles.toolbarGroup}>
          <button
            className={`${styles.toolbarButton} ${getStyleState("align") === "left" ? styles.active : ""}`}
            onClick={() => setAlignment("left")}
            title="Aligner à gauche"
          >
            ≡
          </button>
          <button
            className={`${styles.toolbarButton} ${getStyleState("align") === "center" ? styles.active : ""}`}
            onClick={() => setAlignment("center")}
            title="Centrer"
          >
            ☰
          </button>
          <button
            className={`${styles.toolbarButton} ${getStyleState("align") === "right" ? styles.active : ""}`}
            onClick={() => setAlignment("right")}
            title="Aligner à droite"
          >
            ≡
          </button>
        </div>

        <div className={styles.separator} />

        {/* === COULEURS === */}
        <div className={styles.toolbarGroup}>
          <div className={styles.colorPickerWrapper}>
            <span className={styles.colorLabel}>🎨</span>
            <input
              type="color"
              value={cellData?.style?.bgColor || "#ffffff"}
              onChange={(e) => setBgColor(e.target.value)}
              className={styles.colorPicker}
              title="Couleur de fond"
            />
          </div>
          <div className={styles.colorPickerWrapper}>
            <span className={styles.colorLabel} style={{ fontWeight: "bold" }}>
              A
            </span>
            <input
              type="color"
              value={cellData?.style?.textColor || "#000000"}
              onChange={(e) => setTextColor(e.target.value)}
              className={styles.colorPicker}
              title="Couleur du texte"
            />
          </div>
        </div>

        <div className={styles.separator} />

        {/* === SÉLECTEUR DE PLAGE === */}
        <div className={styles.toolbarGroup}>
          <button
            className={`${styles.toolbarButton} ${hasRange ? styles.active : ""}`}
            onClick={() => setShowRangeSelector(!showRangeSelector)}
            title="Sélectionner une plage"
          >
            📊
          </button>
          {hasRange && (
            <button
              className={`${styles.toolbarButton} ${styles.danger}`}
              onClick={() => {
                if (
                  selectedRange &&
                  confirm(
                    `Vider la plage ${selectedRange.start}:${selectedRange.end} ?`,
                  )
                ) {
                  clearRange(selectedRange.start, selectedRange.end);
                }
              }}
              title="Vider la plage"
            >
              🗑️
            </button>
          )}
        </div>

        {/* === INFO === */}
        <div className={styles.toolbarGroup} style={{ marginLeft: "auto" }}>
          <span className={styles.cellInfo}>
            {getSelectionInfo}
            {hasRange && selectedRange && (
              <span
                style={{ marginLeft: 8, color: "#34a853", fontSize: "11px" }}
              >
                {getRangeCells(selectedRange.start, selectedRange.end).length}{" "}
                cellules
              </span>
            )}
          </span>
        </div>
      </div>

      {showRangeSelector && (
        <div className={styles.rangeSelectorOverlay}>
          <RangeSelector
            onRangeSelect={(start, end) => {
              selectRange(start, end);
              setShowRangeSelector(false);
            }}
            onClose={() => setShowRangeSelector(false)}
          />
        </div>
      )}
    </>
  );
};
