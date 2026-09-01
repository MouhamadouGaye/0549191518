// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import { CellData, CellStyle, CellValue } from "./types";

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
//   setCellRaw: (id: string, value: CellValue, formula?: string) => void;
//   setCellStyle: (id: string, style: Partial<CellStyle>) => void;
//   selectCell: (id: string) => void;
//   selectRange: (start: string, end: string) => void;
//   getCellValue: (id: string) => string;
//   getDisplayValue: (id: string) => string;
//   getCellRaw: (id: string) => CellData | undefined;
//   clearRange: (start: string, end: string) => void;
//   fillDown: (start: string, end: string) => void;
//   getFormulaResult: (formula: string) => string;
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
//     (set, get): SpreadsheetStore => ({
//       // === ÉTAT INITIAL ===
//       cells: new Map(),
//       selectedCell: null,
//       selectedRange: null,

//       // === ACTIONS ===

//       selectCell: (id: string) => {
//         set({ selectedCell: id });
//       },

//       selectRange: (start: string, end: string) => {
//         set({ selectedRange: { start, end } });
//       },

//       getCellValue: (id: string) => {
//         const cell = get().cells.get(id);
//         if (!cell) return "";
//         if (cell.value === null) return "";
//         if (typeof cell.value === "boolean")
//           return cell.value ? "VRAI" : "FAUX";
//         return cell.value.toString();
//       },

//       getDisplayValue: (id: string) => {
//         const cell = get().cells.get(id);
//         if (!cell) return "";
//         if (cell.display) return cell.display;
//         if (cell.value === null) return "";
//         if (typeof cell.value === "boolean")
//           return cell.value ? "VRAI" : "FAUX";
//         return cell.value.toString();
//       },

//       getCellRaw: (id: string) => {
//         return get().cells.get(id);
//       },

//       getFormulaResult: (formula: string) => {
//         return evaluateFormula(formula, get().getCellValue);
//       },

//       setCellValue: (id: string, value: string) => {
//         const { cells, getCellValue } = get();

//         // Vérifier si la valeur a vraiment changé
//         const existing = cells.get(id);
//         if (existing && existing.value === value && !existing.formula) {
//           return;
//         }

//         let display = value;
//         let formula: string | undefined = undefined;
//         let cellValue: CellValue = value;

//         if (value.startsWith("=")) {
//           formula = value;
//           display = evaluateFormula(value, getCellValue);
//           cellValue = value;
//         } else {
//           const num = parseFloat(value);
//           if (!isNaN(num) && value.trim() !== "") {
//             cellValue = num;
//           } else if (
//             value.toLowerCase() === "vrai" ||
//             value.toLowerCase() === "true"
//           ) {
//             cellValue = true;
//           } else if (
//             value.toLowerCase() === "faux" ||
//             value.toLowerCase() === "false"
//           ) {
//             cellValue = false;
//           } else if (value === "") {
//             cellValue = null;
//           }
//           display = value;
//         }

//         const newCells = new Map(cells);
//         const existingCell = newCells.get(id) || {
//           value: null,
//           display: "",
//           style: { ...defaultStyle },
//         };

//         newCells.set(id, {
//           ...existingCell,
//           value: cellValue,
//           display,
//           formula,
//         });

//         set({ cells: newCells });

//         // Recalculer les formules dépendantes
//         if (value.startsWith("=") || existing?.formula) {
//           requestAnimationFrame(() => {
//             const currentCells = get().cells;
//             const updatedCells = new Map(currentCells);
//             const allCells = Array.from(updatedCells.entries());
//             let needsUpdate = true;
//             let iterations = 0;
//             const maxIterations = 10;

//             while (needsUpdate && iterations < maxIterations) {
//               needsUpdate = false;
//               iterations++;

//               for (const [cellId, data] of allCells) {
//                 if (data.formula) {
//                   const newDisplay = evaluateFormula(data.formula, (refId) => {
//                     const ref = updatedCells.get(refId);
//                     if (!ref) return "";
//                     if (ref.value === null) return "";
//                     if (typeof ref.value === "boolean")
//                       return ref.value ? "VRAI" : "FAUX";
//                     return ref.value.toString();
//                   });
//                   if (newDisplay !== data.display) {
//                     updatedCells.set(cellId, { ...data, display: newDisplay });
//                     needsUpdate = true;
//                   }
//                 }
//               }
//             }

//             set({ cells: updatedCells });
//           });
//         }
//       },

//       setCellRaw: (id: string, value: CellValue, formula?: string) => {
//         const { cells } = get();
//         const newCells = new Map(cells);
//         const existing = newCells.get(id) || {
//           value: null,
//           display: "",
//           style: { ...defaultStyle },
//         };

//         let display = value?.toString() || "";
//         if (formula) {
//           display = evaluateFormula(formula, get().getCellValue);
//         }

//         newCells.set(id, {
//           ...existing,
//           value,
//           display,
//           formula,
//         });

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
//           newCells.set(id, {
//             value: null,
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
//               let newValue: CellValue = sourceData.value;
//               let newFormula: string | undefined = sourceData.formula;

//               if (sourceData.formula) {
//                 newFormula = sourceData.formula.replace(/\d+/g, (match) => {
//                   const num = parseInt(match);
//                   const diff = r - startRow;
//                   return (num + diff).toString();
//                 });
//                 newValue = newFormula;
//               }

//               const newDisplay = newFormula
//                 ? evaluateFormula(newFormula, (id) => {
//                     const ref = newCells.get(id);
//                     if (!ref) return "";
//                     if (ref.value === null) return "";
//                     if (typeof ref.value === "boolean")
//                       return ref.value ? "VRAI" : "FAUX";
//                     return ref.value.toString();
//                   })
//                 : sourceData.display;

//               newCells.set(targetId, {
//                 ...sourceData,
//                 value: newValue,
//                 display: newDisplay,
//                 formula: newFormula,
//               });
//             }
//           }
//         }
//         set({ cells: newCells });
//       },
//     }),
//     {
//       name: "SpreadsheetStore",
//       enabled: process.env.NODE_ENV === "development",
//     },
//   ),
// );
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

// ============ INTERFACE DU STORE ============
interface SpreadsheetStore {
  // État
  cells: Map<string, CellData>;
  selectedCell: string | null;
  selectedRange: { start: string; end: string } | null;
  rangeSelectionMode: boolean;

  // Actions de base
  setCellValue: (id: string, value: string) => void;
  setCellRaw: (id: string, value: CellValue, formula?: string) => void;
  setCellStyle: (id: string, style: Partial<CellStyle>) => void;
  selectCell: (id: string) => void;
  selectRange: (start: string, end: string) => void;
  clearSelection: () => void;
  getCellValue: (id: string) => string;
  getDisplayValue: (id: string) => string;
  getCellRaw: (id: string) => CellData | undefined;
  getFormulaResult: (formula: string) => string;

  // Méthodes de plage
  getRangeCells: (start: string, end: string) => string[];
  getRangeValues: (start: string, end: string) => (string | number)[];
  getRangeSum: (start: string, end: string) => number;
  getRangeAverage: (start: string, end: string) => number;
  getRangeCount: (start: string, end: string) => number;
  getRangeMax: (start: string, end: string) => number;
  getRangeMin: (start: string, end: string) => number;
  getRangeStats: (
    start: string,
    end: string,
  ) => {
    sum: number;
    average: number;
    count: number;
    max: number;
    min: number;
    nonEmpty: number;
  };
  applyStyleToRange: (
    start: string,
    end: string,
    style: Partial<CellStyle>,
  ) => void;
  clearRange: (start: string, end: string) => void;
  fillRange: (start: string, end: string, direction?: "down" | "right") => void;
  fillRangeWithValue: (start: string, end: string, value: string) => void;

  // Pour les performances
  _updateQueue: Map<string, CellData>;
  _flushUpdates: () => void;
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
    const startCol = col1.charCodeAt(0) - 65;
    const endCol = col2.charCodeAt(0) - 65;
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    let sum = 0;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const val = parseFloat(getValue(`${String.fromCharCode(65 + c)}${r}`));
        if (!isNaN(val)) sum += val;
      }
    }
    return sum.toString();
  }

  // MOYENNE(plage)
  const avgMatch = expr.match(/^MOYENNE\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (avgMatch) {
    const [, col1, row1, col2, row2] = avgMatch;
    const startCol = col1.charCodeAt(0) - 65;
    const endCol = col2.charCodeAt(0) - 65;
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    let sum = 0,
      count = 0;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const val = parseFloat(getValue(`${String.fromCharCode(65 + c)}${r}`));
        if (!isNaN(val)) {
          sum += val;
          count++;
        }
      }
    }
    return count > 0 ? (sum / count).toString() : "0";
  }

  // MAX(plage)
  const maxMatch = expr.match(/^MAX\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (maxMatch) {
    const [, col1, row1, col2, row2] = maxMatch;
    const startCol = col1.charCodeAt(0) - 65;
    const endCol = col2.charCodeAt(0) - 65;
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    let max = -Infinity,
      hasValue = false;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const val = parseFloat(getValue(`${String.fromCharCode(65 + c)}${r}`));
        if (!isNaN(val)) {
          max = Math.max(max, val);
          hasValue = true;
        }
      }
    }
    return hasValue ? max.toString() : "0";
  }

  // MIN(plage)
  const minMatch = expr.match(/^MIN\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (minMatch) {
    const [, col1, row1, col2, row2] = minMatch;
    const startCol = col1.charCodeAt(0) - 65;
    const endCol = col2.charCodeAt(0) - 65;
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    let min = Infinity,
      hasValue = false;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const val = parseFloat(getValue(`${String.fromCharCode(65 + c)}${r}`));
        if (!isNaN(val)) {
          min = Math.min(min, val);
          hasValue = true;
        }
      }
    }
    return hasValue ? min.toString() : "0";
  }

  // NB(plage) - Compte les nombres
  const countMatch = expr.match(/^NB\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (countMatch) {
    const [, col1, row1, col2, row2] = countMatch;
    const startCol = col1.charCodeAt(0) - 65;
    const endCol = col2.charCodeAt(0) - 65;
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    let count = 0;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const val = parseFloat(getValue(`${String.fromCharCode(65 + c)}${r}`));
        if (!isNaN(val)) count++;
      }
    }
    return count.toString();
  }

  // NBVAL(plage) - Compte les non-vides
  const countValMatch = expr.match(/^NBVAL\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (countValMatch) {
    const [, col1, row1, col2, row2] = countValMatch;
    const startCol = col1.charCodeAt(0) - 65;
    const endCol = col2.charCodeAt(0) - 65;
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    let count = 0;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const val = getValue(`${String.fromCharCode(65 + c)}${r}`);
        if (val !== "" && val !== null && val !== undefined) count++;
      }
    }
    return count.toString();
  }

  // SI(condition; vrai; faux)
  const ifMatch = expr.match(/^SI\((.+?);(.+?);(.+?)\)$/);
  if (ifMatch) {
    const [, condition, trueValue, falseValue] = ifMatch;
    const conditionResult = evaluateCondition(condition, getValue);
    return conditionResult ? trueValue.trim() : falseValue.trim();
  }

  // CONCAT(plage)
  const concatMatch = expr.match(/^CONCAT\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (concatMatch) {
    const [, col1, row1, col2, row2] = concatMatch;
    const startCol = col1.charCodeAt(0) - 65;
    const endCol = col2.charCodeAt(0) - 65;
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    let result = "";
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const val = getValue(`${String.fromCharCode(65 + c)}${r}`);
        if (val !== "" && val !== null && val !== undefined) result += val;
      }
    }
    return result;
  }

  // AUJOURDHUI()
  if (expr === "AUJOURDHUI()") {
    return new Date().toLocaleDateString("fr-FR");
  }

  // MAINTENANT()
  if (expr === "MAINTENANT()") {
    return new Date().toLocaleString("fr-FR");
  }

  // SIERREUR(valeur; valeur_si_erreur)
  const ifErrorMatch = expr.match(/^SIERREUR\((.+?);(.+?)\)$/);
  if (ifErrorMatch) {
    const [, valueToCheck, errorValue] = ifErrorMatch;
    try {
      const result = evaluateFormula(`=${valueToCheck}`, getValue);
      if (result === "#ERREUR" || result === "#VALEUR!" || result === "#N/A") {
        return errorValue.trim();
      }
      return result;
    } catch {
      return errorValue.trim();
    }
  }

  // ARRONDI(valeur; decimales)
  const roundMatch = expr.match(/^ARRONDI\((.+?);(\d+)\)$/);
  if (roundMatch) {
    const [, value, decimals] = roundMatch;
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return num.toFixed(parseInt(decimals));
    }
    return "#VALEUR!";
  }

  // PUISSANCE(nombre; exposant)
  const powerMatch = expr.match(/^PUISSANCE\((.+?);(.+?)\)$/);
  if (powerMatch) {
    const [, base, exponent] = powerMatch;
    const b = parseFloat(base);
    const e = parseFloat(exponent);
    if (!isNaN(b) && !isNaN(e)) {
      return Math.pow(b, e).toString();
    }
    return "#VALEUR!";
  }

  // Opérations arithmétiques de base
  let result = expr;
  const cellRefs = result.match(/[A-Z]+\d+/g) || [];
  for (const ref of cellRefs) {
    result = result.replace(ref, getValue(ref) || "0");
  }
  try {
    const computed = Function(`return (${result})`)();
    return computed !== undefined && !isNaN(computed)
      ? computed.toString()
      : "#ERREUR";
  } catch {
    return "#ERREUR";
  }
};

const evaluateCondition = (
  condition: string,
  getValue: (id: string) => string,
): boolean => {
  const operators = [">=", "<=", "!=", "=", ">", "<"];
  for (const op of operators) {
    if (condition.includes(op)) {
      const [left, right] = condition.split(op).map((s) => s.trim());
      const leftVal = getValue(left) || left;
      const rightVal = getValue(right) || right;

      const leftNum = parseFloat(leftVal);
      const rightNum = parseFloat(rightVal);
      if (!isNaN(leftNum) && !isNaN(rightNum)) {
        switch (op) {
          case ">=":
            return leftNum >= rightNum;
          case "<=":
            return leftNum <= rightNum;
          case "!=":
            return leftNum !== rightNum;
          case "=":
            return leftNum === rightNum;
          case ">":
            return leftNum > rightNum;
          case "<":
            return leftNum < rightNum;
        }
      }

      switch (op) {
        case ">=":
          return leftVal >= rightVal;
        case "<=":
          return leftVal <= rightVal;
        case "!=":
          return leftVal !== rightVal;
        case "=":
          return leftVal === rightVal;
        case ">":
          return leftVal > rightVal;
        case "<":
          return leftVal < rightVal;
      }
    }
  }
  return false;
};

// ============ STORE ============
export const useStore = create<SpreadsheetStore>()(
  devtools(
    (set, get) => ({
      // ============ ÉTAT INITIAL ============
      cells: new Map(),
      selectedCell: null,
      selectedRange: null,
      rangeSelectionMode: false,
      _updateQueue: new Map(),

      // ============ FLUSH DES MISES À JOUR ============
      _flushUpdates: () => {
        const queue = get()._updateQueue;
        if (queue.size === 0) return;

        const currentCells = get().cells;
        const newCells = new Map(currentCells);

        for (const [id, data] of queue) {
          newCells.set(id, data);
        }

        queue.clear();
        set({ cells: newCells });
      },

      // ============ SÉLECTION ============
      selectCell: (id: string) => {
        if (get().selectedCell === id && !get().rangeSelectionMode) return;
        set({
          selectedCell: id,
          selectedRange: null,
          rangeSelectionMode: false,
        });
      },

      selectRange: (start: string, end: string) => {
        set({
          selectedRange: { start, end },
          selectedCell: start,
          rangeSelectionMode: true,
        });
      },

      clearSelection: () => {
        set({
          selectedRange: null,
          rangeSelectionMode: false,
        });
      },

      // ============ LECTURE DES CELLULES ============
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

      // ============ ÉCRITURE DES CELLULES ============
      setCellValue: (id: string, value: string) => {
        const { cells, _updateQueue } = get();

        const existing = cells.get(id);
        const existingValue = existing?.value?.toString() || "";
        if (existingValue === value && !existing?.formula) {
          return;
        }

        let display = value;
        let formula: string | undefined = undefined;
        let cellValue: CellValue = value;

        if (value.startsWith("=")) {
          formula = value;
          display = evaluateFormula(value, get().getCellValue);
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

        const existingCell = cells.get(id) || {
          value: null,
          display: "",
          style: { ...defaultStyle },
        };

        const newData = {
          ...existingCell,
          value: cellValue,
          display,
          formula,
        };

        _updateQueue.set(id, newData);
        get()._flushUpdates();

        // Recalculer les formules dépendantes
        if (value.startsWith("=") || existing?.formula) {
          setTimeout(() => {
            const currentCells = get().cells;
            const updatedCells = new Map(currentCells);
            let changed = false;

            for (const [cellId, data] of updatedCells) {
              if (data.formula && cellId !== id) {
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
                  changed = true;
                }
              }
            }

            if (changed) {
              set({ cells: updatedCells });
            }
          }, 0);
        }
      },

      setCellRaw: (id: string, value: CellValue, formula?: string) => {
        const { cells, _updateQueue } = get();
        const existing = cells.get(id) || {
          value: null,
          display: "",
          style: { ...defaultStyle },
        };

        let display = value?.toString() || "";
        if (formula) {
          display = evaluateFormula(formula, get().getCellValue);
        }

        const newData = {
          ...existing,
          value,
          display,
          formula,
        };

        _updateQueue.set(id, newData);
        get()._flushUpdates();
      },

      setCellStyle: (id: string, style: Partial<CellStyle>) => {
        const { cells, _updateQueue } = get();
        const existing = cells.get(id);

        if (existing) {
          const currentStyle = existing.style;
          const hasChanged = Object.keys(style).some(
            (key) =>
              currentStyle[key as keyof CellStyle] !==
              style[key as keyof CellStyle],
          );
          if (!hasChanged) return;

          const newData = {
            ...existing,
            style: { ...existing.style, ...style },
          };
          _updateQueue.set(id, newData);
          get()._flushUpdates();
        } else {
          const newData = {
            value: null,
            display: "",
            style: { ...defaultStyle, ...style },
          };
          _updateQueue.set(id, newData);
          get()._flushUpdates();
        }
      },

      // ============ MÉTHODES DE PLAGE ============
      getRangeCells: (start: string, end: string) => {
        const startCol = start.charCodeAt(0) - 65;
        const endCol = end.charCodeAt(0) - 65;
        const startRow = parseInt(start.substring(1));
        const endRow = parseInt(end.substring(1));
        const cells: string[] = [];

        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);
        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);

        for (let r = minRow; r <= maxRow; r++) {
          for (let c = minCol; c <= maxCol; c++) {
            cells.push(`${String.fromCharCode(65 + c)}${r}`);
          }
        }
        return cells;
      },

      getRangeValues: (start: string, end: string) => {
        const cellIds = get().getRangeCells(start, end);
        const values: (string | number)[] = [];

        for (const id of cellIds) {
          const cell = get().cells.get(id);
          if (cell) {
            const val = cell.value;
            if (val !== null && val !== "") {
              if (typeof val === "number") {
                values.push(val);
              } else if (typeof val === "string" && !isNaN(parseFloat(val))) {
                values.push(parseFloat(val));
              } else if (typeof val === "string") {
                values.push(val);
              }
            }
          }
        }
        return values;
      },

      getRangeSum: (start: string, end: string) => {
        const values = get().getRangeValues(start, end);
        return values
          .filter((v) => typeof v === "number")
          .reduce((sum, v) => sum + (v as number), 0);
      },

      getRangeAverage: (start: string, end: string) => {
        const values = get().getRangeValues(start, end);
        const numbers = values.filter((v) => typeof v === "number") as number[];
        return numbers.length > 0
          ? numbers.reduce((a, b) => a + b, 0) / numbers.length
          : 0;
      },

      getRangeCount: (start: string, end: string) => {
        return get().getRangeCells(start, end).length;
      },

      getRangeMax: (start: string, end: string) => {
        const values = get().getRangeValues(start, end);
        const numbers = values.filter((v) => typeof v === "number") as number[];
        return numbers.length > 0 ? Math.max(...numbers) : 0;
      },

      getRangeMin: (start: string, end: string) => {
        const values = get().getRangeValues(start, end);
        const numbers = values.filter((v) => typeof v === "number") as number[];
        return numbers.length > 0 ? Math.min(...numbers) : 0;
      },

      getRangeStats: (start: string, end: string) => {
        const cellIds = get().getRangeCells(start, end);
        const values = get().getRangeValues(start, end);
        const numbers = values.filter((v) => typeof v === "number") as number[];
        const nonEmpty = cellIds.filter((id) => {
          const cell = get().cells.get(id);
          return cell && cell.value !== null && cell.value !== "";
        }).length;

        return {
          sum: numbers.reduce((a, b) => a + b, 0),
          average:
            numbers.length > 0
              ? numbers.reduce((a, b) => a + b, 0) / numbers.length
              : 0,
          count: cellIds.length,
          max: numbers.length > 0 ? Math.max(...numbers) : 0,
          min: numbers.length > 0 ? Math.min(...numbers) : 0,
          nonEmpty,
        };
      },

      //   applyStyleToRange: (
      //     start: string,
      //     end: string,
      //     style: Partial<CellStyle>,
      //   ) => {
      //     const { _updateQueue } = get();
      //     const cellIds = get().getRangeCells(start, end);
      //     let hasChanges = false;

      //     for (const id of cellIds) {
      //       const existing = get().cells.get(id);
      //       const currentStyle = existing?.style || { ...defaultStyle };

      //       const hasChanged = Object.keys(style).some(
      //         (key) =>
      //           currentStyle[key as keyof CellStyle] !==
      //           style[key as keyof CellStyle],
      //       );

      //       if (hasChanged) {
      //         const newData = existing
      //           ? {
      //               ...existing,
      //               style: { ...currentStyle, ...style },
      //             }
      //           : {
      //               value: null,
      //               display: "",
      //               style: { ...defaultStyle, ...style },
      //             };
      //         _updateQueue.set(id, newData);
      //         hasChanges = true;
      //       }
      //     }

      //     if (hasChanges) {
      //       get()._flushUpdates();
      //     }
      //   },
      // src/store/spreadsheetstore.ts - Vérifier que la méthode est complète

      applyStyleToRange: (
        start: string,
        end: string,
        style: Partial<CellStyle>,
      ) => {
        const { cells, _updateQueue } = get();
        const cellIds = get().getRangeCells(start, end);
        let hasChanges = false;

        for (const id of cellIds) {
          const existing = cells.get(id);
          const currentStyle = existing?.style || { ...defaultStyle };

          // Vérifier si le style change vraiment
          const hasChanged = Object.keys(style).some(
            (key) =>
              currentStyle[key as keyof CellStyle] !==
              style[key as keyof CellStyle],
          );

          if (hasChanged) {
            const newData = existing
              ? {
                  ...existing,
                  style: { ...currentStyle, ...style },
                }
              : {
                  value: null,
                  display: "",
                  style: { ...defaultStyle, ...style },
                };
            _updateQueue.set(id, newData);
            hasChanges = true;
          }
        }

        if (hasChanges) {
          get()._flushUpdates();
        }
      },

      clearRange: (start: string, end: string) => {
        const { cells } = get();
        const newCells = new Map(cells);
        const cellIds = get().getRangeCells(start, end);

        for (const id of cellIds) {
          newCells.delete(id);
        }

        set({ cells: newCells });
      },

      fillRange: (
        start: string,
        end: string,
        direction: "down" | "right" = "down",
      ) => {
        const { cells } = get();
        const newCells = new Map(cells);
        const startCol = start.charCodeAt(0) - 65;
        const endCol = end.charCodeAt(0) - 65;
        const startRow = parseInt(start.substring(1));
        const endRow = parseInt(end.substring(1));

        const sourceId = `${String.fromCharCode(65 + startCol)}${startRow}`;
        const sourceData = newCells.get(sourceId);

        if (!sourceData) return;

        for (
          let r = startRow + (direction === "down" ? 1 : 0);
          r <= endRow;
          r++
        ) {
          for (
            let c = startCol + (direction === "right" ? 1 : 0);
            c <= endCol;
            c++
          ) {
            const targetId = `${String.fromCharCode(65 + c)}${r}`;

            let newValue: CellValue = sourceData.value;
            let newFormula: string | undefined = sourceData.formula;

            if (sourceData.formula) {
              newFormula = sourceData.formula.replace(/\d+/g, (match) => {
                const num = parseInt(match);
                const diff = direction === "down" ? r - startRow : c - startCol;
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

        set({ cells: newCells });
      },

      fillRangeWithValue: (start: string, end: string, value: string) => {
        const { _updateQueue } = get();
        const cellIds = get().getRangeCells(start, end);

        for (const id of cellIds) {
          const existing = get().cells.get(id) || {
            value: null,
            display: "",
            style: { ...defaultStyle },
          };

          const num = parseFloat(value);
          let cellValue: CellValue = value;
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

          _updateQueue.set(id, {
            ...existing,
            value: cellValue,
            display: value,
          });
        }

        get()._flushUpdates();
      },
    }),
    {
      name: "SpreadsheetStore",
      enabled: false,
    },
  ),
);

// ============ EXPORT DES TYPES POUR LE STORE ============
export type { SpreadsheetStore };
