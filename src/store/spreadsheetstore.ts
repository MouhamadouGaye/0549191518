// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import { CellData, CellStyle } from "./types";

// const defaultStyle: CellStyle = {
//   bold: false,
//   italic: false,
//   underline: false,
//   strikethrough: false,
//   bgColor: "#ffffff",
//   textColor: "#202124",
//   align: "left",
//   fontSize: 13,
//   fontFamily: "Arial",
// };

// interface SpreadsheetStore {
//   cells: Map<string, CellData>;
//   selectedCell: string | null;
//   selectedRange: { start: string; end: string } | null;
//   setCellValue: (id: string, value: string) => void;
//   setCellStyle: (id: string, style: Partial<CellStyle>) => void;
//   selectCell: (id: string) => void;
//   selectRange: (start: string, end: string) => void;
//   getCellValue: (id: string) => string;
//   getDisplayValue: (id: string) => string;
//   getCellRaw: (id: string) => CellData | undefined;
//   clearRange: (start: string, end: string) => void;
//   fillDown: (start: string, end: string) => void;
// }

// // ============ MOTEUR DE FORMULES ============
// const evaluateFormula = (
//   formula: string,
//   getValue: (id: string) => string,
// ): string => {
//   if (!formula.startsWith("=")) return formula;

//   const expr = formula.substring(1).toUpperCase();

//   // SOMME(plage)
//   const sumMatch = expr.match(/^SOMME\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
//   if (sumMatch) {
//     const [, col1, row1, col2, row2] = sumMatch;
//     return sumRange(col1, row1, col2, row2, getValue).toString();
//   }

//   // MOYENNE(plage)
//   const avgMatch = expr.match(/^MOYENNE\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
//   if (avgMatch) {
//     const [, col1, row1, col2, row2] = avgMatch;
//     return averageRange(col1, row1, col2, row2, getValue).toString();
//   }

//   // MAX(plage)
//   const maxMatch = expr.match(/^MAX\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
//   if (maxMatch) {
//     const [, col1, row1, col2, row2] = maxMatch;
//     return maxRange(col1, row1, col2, row2, getValue).toString();
//   }

//   // MIN(plage)
//   const minMatch = expr.match(/^MIN\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
//   if (minMatch) {
//     const [, col1, row1, col2, row2] = minMatch;
//     return minRange(col1, row1, col2, row2, getValue).toString();
//   }

//   // Support des opérations de base
//   return evaluateArithmetic(expr, getValue);
// };

// // ============ FONCTIONS D'AIDE ============
// const getRangeNumbers = (
//   col1: string,
//   row1: string,
//   col2: string,
//   row2: string,
//   getValue: (id: string) => string,
// ): number[] => {
//   const startCol = col1.charCodeAt(0) - 65;
//   const endCol = col2.charCodeAt(0) - 65;
//   const startRow = parseInt(row1);
//   const endRow = parseInt(row2);
//   const numbers: number[] = [];

//   for (let r = startRow; r <= endRow; r++) {
//     for (let c = startCol; c <= endCol; c++) {
//       const cellId = `${String.fromCharCode(65 + c)}${r}`;
//       const val = parseFloat(getValue(cellId));
//       if (!isNaN(val)) numbers.push(val);
//     }
//   }
//   return numbers;
// };

// const sumRange = (
//   col1: string,
//   row1: string,
//   col2: string,
//   row2: string,
//   getValue: (id: string) => string,
// ): number => {
//   return getRangeNumbers(col1, row1, col2, row2, getValue).reduce(
//     (a, b) => a + b,
//     0,
//   );
// };

// const averageRange = (
//   col1: string,
//   row1: string,
//   col2: string,
//   row2: string,
//   getValue: (id: string) => string,
// ): number => {
//   const nums = getRangeNumbers(col1, row1, col2, row2, getValue);
//   return nums.length > 0 ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
// };

// const maxRange = (
//   col1: string,
//   row1: string,
//   col2: string,
//   row2: string,
//   getValue: (id: string) => string,
// ): number => {
//   const nums = getRangeNumbers(col1, row1, col2, row2, getValue);
//   return nums.length > 0 ? Math.max(...nums) : 0;
// };

// const minRange = (
//   col1: string,
//   row1: string,
//   col2: string,
//   row2: string,
//   getValue: (id: string) => string,
// ): number => {
//   const nums = getRangeNumbers(col1, row1, col2, row2, getValue);
//   return nums.length > 0 ? Math.min(...nums) : 0;
// };

// const evaluateArithmetic = (
//   expr: string,
//   getValue: (id: string) => string,
// ): string => {
//   let result = expr;
//   const cellRefs = result.match(/[A-Z]+\d+/g) || [];
//   for (const ref of cellRefs) {
//     const val = getValue(ref);
//     result = result.replace(ref, val || "0");
//   }

//   try {
//     const fn = new Function(`return (${result})`);
//     const computed = fn();
//     return computed !== undefined && !isNaN(computed)
//       ? computed.toString()
//       : "#ERREUR";
//   } catch {
//     return "#ERREUR";
//   }
// };

// // ============ STORE OPTIMISÉ ============
// export const useStore = create<SpreadsheetStore>()(
//   devtools(
//     (set, get) => ({
//       cells: new Map(),
//       selectedCell: null,
//       selectedRange: null,

//       selectCell: (id: string) => {
//         set({ selectedCell: id });
//       },

//       selectRange: (start: string, end: string) => {
//         set({ selectedRange: { start, end } });
//       },

//       getCellValue: (id: string) => {
//         const cell = get().cells.get(id);
//         return cell?.value ?? "";
//       },

//       getDisplayValue: (id: string) => {
//         const cell = get().cells.get(id);
//         return cell?.display ?? cell?.value ?? "";
//       },

//       getCellRaw: (id: string) => {
//         return get().cells.get(id);
//       },

//       setCellValue: (id: string, value: string) => {
//         const { cells, getCellValue } = get();

//         let display = value;
//         if (value.startsWith("=")) {
//           display = evaluateFormula(value, getCellValue);
//         }

//         const newCells = new Map(cells);
//         const existing = newCells.get(id) || {
//           value: "",
//           display: "",
//           style: { ...defaultStyle },
//         };

//         newCells.set(id, {
//           ...existing,
//           value,
//           display,
//         });

//         set({ cells: newCells });

//         // Recalculer les formules dépendantes (optimisé)
//         const allCells = Array.from(newCells.entries());
//         let needsUpdate = true;
//         let iterations = 0;
//         const maxIterations = 50;

//         while (needsUpdate && iterations < maxIterations) {
//           needsUpdate = false;
//           iterations++;

//           for (const [cellId, data] of allCells) {
//             if (data.value.startsWith("=")) {
//               const newDisplay = evaluateFormula(data.value, (refId) => {
//                 const ref = newCells.get(refId);
//                 return ref?.display ?? ref?.value ?? "";
//               });
//               if (newDisplay !== data.display) {
//                 newCells.set(cellId, { ...data, display: newDisplay });
//                 needsUpdate = true;
//               }
//             }
//           }
//         }

//         set({ cells: newCells });
//       },

//       setCellStyle: (id: string, style: Partial<CellStyle>) => {
//         const { cells } = get();
//         const newCells = new Map(cells);
//         const existing = newCells.get(id);

//         if (existing) {
//           newCells.set(id, {
//             ...existing,
//             style: { ...existing.style, ...style },
//           });
//           set({ cells: newCells });
//         } else {
//           // Créer une nouvelle cellule avec le style
//           newCells.set(id, {
//             value: "",
//             display: "",
//             style: { ...defaultStyle, ...style },
//           });
//           set({ cells: newCells });
//         }
//       },

//       clearRange: (start: string, end: string) => {
//         const { cells } = get();
//         const newCells = new Map(cells);
//         const startCol = start.charCodeAt(0) - 65;
//         const endCol = end.charCodeAt(0) - 65;
//         const startRow = parseInt(start.substring(1));
//         const endRow = parseInt(end.substring(1));

//         for (let r = startRow; r <= endRow; r++) {
//           for (let c = startCol; c <= endCol; c++) {
//             const cellId = `${String.fromCharCode(65 + c)}${r}`;
//             newCells.delete(cellId);
//           }
//         }
//         set({ cells: newCells });
//       },

//       fillDown: (start: string, end: string) => {
//         const { cells, getCellValue } = get();
//         const newCells = new Map(cells);
//         const startCol = start.charCodeAt(0) - 65;
//         const endCol = end.charCodeAt(0) - 65;
//         const startRow = parseInt(start.substring(1));
//         const endRow = parseInt(end.substring(1));

//         for (let r = startRow + 1; r <= endRow; r++) {
//           for (let c = startCol; c <= endCol; c++) {
//             const sourceId = `${String.fromCharCode(65 + c)}${startRow}`;
//             const targetId = `${String.fromCharCode(65 + c)}${r}`;
//             const sourceData = newCells.get(sourceId);
//             if (sourceData) {
//               let newValue = sourceData.value;
//               if (newValue.startsWith("=")) {
//                 newValue = newValue.replace(/\d+/g, (match) => {
//                   const num = parseInt(match);
//                   const diff = r - startRow;
//                   return (num + diff).toString();
//                 });
//               }
//               const newDisplay = newValue.startsWith("=")
//                 ? evaluateFormula(
//                     newValue,
//                     (id) => newCells.get(id)?.display ?? "",
//                   )
//                 : newValue;

//               newCells.set(targetId, {
//                 ...sourceData,
//                 value: newValue,
//                 display: newDisplay,
//               });
//             }
//           }
//         }
//         set({ cells: newCells });
//       },
//     }),
//     { name: "SpreadsheetStore" },
//   ),
// );
// src/store/spreadsheetstore.ts

// src/store/spreadsheetstore.ts

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CellData, CellStyle, CellValue } from "./types";

const defaultStyle: CellStyle = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  bgColor: "#ffffff",
  textColor: "#202124",
  align: "left",
  fontSize: 13,
  fontFamily: "Arial",
};

interface SpreadsheetStore {
  cells: Map<string, CellData>;
  selectedCell: string | null;
  selectedRange: { start: string; end: string } | null;
  setCellValue: (id: string, value: string) => void;
  setCellRaw: (id: string, value: CellValue, formula?: string) => void;
  setCellStyle: (id: string, style: Partial<CellStyle>) => void;
  selectCell: (id: string) => void;
  selectRange: (start: string, end: string) => void;
  getCellValue: (id: string) => string;
  getDisplayValue: (id: string) => string;
  getCellRaw: (id: string) => CellData | undefined;
  clearRange: (start: string, end: string) => void;
  fillDown: (start: string, end: string) => void;
  getFormulaResult: (formula: string) => string;
}

// ============ MOTEUR DE FORMULES ============
const evaluateFormula = (
  formula: string,
  getValue: (id: string) => string,
): string => {
  if (!formula.startsWith("=")) return formula;

  const expr = formula.substring(1).toUpperCase();

  // SOMME(plage)
  const sumMatch = expr.match(/^SOMME\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (sumMatch) {
    const [, col1, row1, col2, row2] = sumMatch;
    return sumRange(col1, row1, col2, row2, getValue).toString();
  }

  // MOYENNE(plage)
  const avgMatch = expr.match(/^MOYENNE\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (avgMatch) {
    const [, col1, row1, col2, row2] = avgMatch;
    return averageRange(col1, row1, col2, row2, getValue).toString();
  }

  // MAX(plage)
  const maxMatch = expr.match(/^MAX\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (maxMatch) {
    const [, col1, row1, col2, row2] = maxMatch;
    return maxRange(col1, row1, col2, row2, getValue).toString();
  }

  // MIN(plage)
  const minMatch = expr.match(/^MIN\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (minMatch) {
    const [, col1, row1, col2, row2] = minMatch;
    return minRange(col1, row1, col2, row2, getValue).toString();
  }

  // Support des opérations de base
  return evaluateArithmetic(expr, getValue);
};

// ============ FONCTIONS D'AIDE ============
const getRangeNumbers = (
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  getValue: (id: string) => string,
): number[] => {
  const startCol = col1.charCodeAt(0) - 65;
  const endCol = col2.charCodeAt(0) - 65;
  const startRow = parseInt(row1);
  const endRow = parseInt(row2);
  const numbers: number[] = [];

  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      const cellId = `${String.fromCharCode(65 + c)}${r}`;
      const val = parseFloat(getValue(cellId));
      if (!isNaN(val)) numbers.push(val);
    }
  }
  return numbers;
};

const sumRange = (
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  getValue: (id: string) => string,
): number => {
  return getRangeNumbers(col1, row1, col2, row2, getValue).reduce(
    (a, b) => a + b,
    0,
  );
};

const averageRange = (
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  getValue: (id: string) => string,
): number => {
  const nums = getRangeNumbers(col1, row1, col2, row2, getValue);
  return nums.length > 0 ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
};

const maxRange = (
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  getValue: (id: string) => string,
): number => {
  const nums = getRangeNumbers(col1, row1, col2, row2, getValue);
  return nums.length > 0 ? Math.max(...nums) : 0;
};

const minRange = (
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  getValue: (id: string) => string,
): number => {
  const nums = getRangeNumbers(col1, row1, col2, row2, getValue);
  return nums.length > 0 ? Math.min(...nums) : 0;
};

const evaluateArithmetic = (
  expr: string,
  getValue: (id: string) => string,
): string => {
  let result = expr;
  const cellRefs = result.match(/[A-Z]+\d+/g) || [];
  for (const ref of cellRefs) {
    const val = getValue(ref);
    result = result.replace(ref, val || "0");
  }

  try {
    const fn = new Function(`return (${result})`);
    const computed = fn();
    return computed !== undefined && !isNaN(computed)
      ? computed.toString()
      : "#ERREUR";
  } catch {
    return "#ERREUR";
  }
};

// ============ STORE OPTIMISÉ ============
export const useStore = create<SpreadsheetStore>()(
  devtools(
    (set, get): SpreadsheetStore => ({
      // === ÉTAT INITIAL ===
      cells: new Map(),
      selectedCell: null,
      selectedRange: null,

      // === ACTIONS ===

      selectCell: (id: string) => {
        set({ selectedCell: id });
      },

      selectRange: (start: string, end: string) => {
        set({ selectedRange: { start, end } });
      },

      getCellValue: (id: string) => {
        const cell = get().cells.get(id);
        if (!cell) return "";
        if (cell.value === null) return "";
        if (typeof cell.value === "boolean")
          return cell.value ? "VRAI" : "FAUX";
        return cell.value.toString();
      },

      getDisplayValue: (id: string) => {
        const cell = get().cells.get(id);
        if (!cell) return "";
        if (cell.display) return cell.display;
        if (cell.value === null) return "";
        if (typeof cell.value === "boolean")
          return cell.value ? "VRAI" : "FAUX";
        return cell.value.toString();
      },

      getCellRaw: (id: string) => {
        return get().cells.get(id);
      },

      getFormulaResult: (formula: string) => {
        return evaluateFormula(formula, get().getCellValue);
      },

      setCellValue: (id: string, value: string) => {
        const { cells, getCellValue } = get();

        // Vérifier si la valeur a vraiment changé
        const existing = cells.get(id);
        if (existing && existing.value === value && !existing.formula) {
          return;
        }

        let display = value;
        let formula: string | undefined = undefined;
        let cellValue: CellValue = value;

        if (value.startsWith("=")) {
          formula = value;
          display = evaluateFormula(value, getCellValue);
          cellValue = value;
        } else {
          const num = parseFloat(value);
          if (!isNaN(num) && value.trim() !== "") {
            cellValue = num;
          } else if (
            value.toLowerCase() === "vrai" ||
            value.toLowerCase() === "true"
          ) {
            cellValue = true;
          } else if (
            value.toLowerCase() === "faux" ||
            value.toLowerCase() === "false"
          ) {
            cellValue = false;
          } else if (value === "") {
            cellValue = null;
          }
          display = value;
        }

        const newCells = new Map(cells);
        const existingCell = newCells.get(id) || {
          value: null,
          display: "",
          style: { ...defaultStyle },
        };

        newCells.set(id, {
          ...existingCell,
          value: cellValue,
          display,
          formula,
        });

        set({ cells: newCells });

        // Recalculer les formules dépendantes
        if (value.startsWith("=") || existing?.formula) {
          requestAnimationFrame(() => {
            const currentCells = get().cells;
            const updatedCells = new Map(currentCells);
            const allCells = Array.from(updatedCells.entries());
            let needsUpdate = true;
            let iterations = 0;
            const maxIterations = 10;

            while (needsUpdate && iterations < maxIterations) {
              needsUpdate = false;
              iterations++;

              for (const [cellId, data] of allCells) {
                if (data.formula) {
                  const newDisplay = evaluateFormula(data.formula, (refId) => {
                    const ref = updatedCells.get(refId);
                    if (!ref) return "";
                    if (ref.value === null) return "";
                    if (typeof ref.value === "boolean")
                      return ref.value ? "VRAI" : "FAUX";
                    return ref.value.toString();
                  });
                  if (newDisplay !== data.display) {
                    updatedCells.set(cellId, { ...data, display: newDisplay });
                    needsUpdate = true;
                  }
                }
              }
            }

            set({ cells: updatedCells });
          });
        }
      },

      setCellRaw: (id: string, value: CellValue, formula?: string) => {
        const { cells } = get();
        const newCells = new Map(cells);
        const existing = newCells.get(id) || {
          value: null,
          display: "",
          style: { ...defaultStyle },
        };

        let display = value?.toString() || "";
        if (formula) {
          display = evaluateFormula(formula, get().getCellValue);
        }

        newCells.set(id, {
          ...existing,
          value,
          display,
          formula,
        });

        set({ cells: newCells });
      },

      setCellStyle: (id: string, style: Partial<CellStyle>) => {
        const { cells } = get();
        const newCells = new Map(cells);
        const existing = newCells.get(id);

        if (existing) {
          newCells.set(id, {
            ...existing,
            style: { ...existing.style, ...style },
          });
          set({ cells: newCells });
        } else {
          newCells.set(id, {
            value: null,
            display: "",
            style: { ...defaultStyle, ...style },
          });
          set({ cells: newCells });
        }
      },

      clearRange: (start: string, end: string) => {
        const { cells } = get();
        const newCells = new Map(cells);
        const startCol = start.charCodeAt(0) - 65;
        const endCol = end.charCodeAt(0) - 65;
        const startRow = parseInt(start.substring(1));
        const endRow = parseInt(end.substring(1));

        for (let r = startRow; r <= endRow; r++) {
          for (let c = startCol; c <= endCol; c++) {
            const cellId = `${String.fromCharCode(65 + c)}${r}`;
            newCells.delete(cellId);
          }
        }
        set({ cells: newCells });
      },

      fillDown: (start: string, end: string) => {
        const { cells, getCellValue } = get();
        const newCells = new Map(cells);
        const startCol = start.charCodeAt(0) - 65;
        const endCol = end.charCodeAt(0) - 65;
        const startRow = parseInt(start.substring(1));
        const endRow = parseInt(end.substring(1));

        for (let r = startRow + 1; r <= endRow; r++) {
          for (let c = startCol; c <= endCol; c++) {
            const sourceId = `${String.fromCharCode(65 + c)}${startRow}`;
            const targetId = `${String.fromCharCode(65 + c)}${r}`;
            const sourceData = newCells.get(sourceId);
            if (sourceData) {
              let newValue: CellValue = sourceData.value;
              let newFormula: string | undefined = sourceData.formula;

              if (sourceData.formula) {
                newFormula = sourceData.formula.replace(/\d+/g, (match) => {
                  const num = parseInt(match);
                  const diff = r - startRow;
                  return (num + diff).toString();
                });
                newValue = newFormula;
              }

              const newDisplay = newFormula
                ? evaluateFormula(newFormula, (id) => {
                    const ref = newCells.get(id);
                    if (!ref) return "";
                    if (ref.value === null) return "";
                    if (typeof ref.value === "boolean")
                      return ref.value ? "VRAI" : "FAUX";
                    return ref.value.toString();
                  })
                : sourceData.display;

              newCells.set(targetId, {
                ...sourceData,
                value: newValue,
                display: newDisplay,
                formula: newFormula,
              });
            }
          }
        }
        set({ cells: newCells });
      },
    }),
    {
      name: "SpreadsheetStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
