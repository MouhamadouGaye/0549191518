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

// ============ MOTEUR DE FORMULES COMPLET ============
const evaluateFormula = (
  formula: string,
  getValue: (id: string) => string,
): string => {
  if (!formula.startsWith("=")) return formula;

  const expr = formula.substring(1).toUpperCase();

  // 1. SOMME(plage)
  const sumMatch = expr.match(/^SOMME\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (sumMatch) {
    const [, col1, row1, col2, row2] = sumMatch;
    return sumRange(col1, row1, col2, row2, getValue).toString();
  }

  // 2. MOYENNE(plage)
  const avgMatch = expr.match(/^MOYENNE\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (avgMatch) {
    const [, col1, row1, col2, row2] = avgMatch;
    return averageRange(col1, row1, col2, row2, getValue).toString();
  }

  // 3. MAX(plage)
  const maxMatch = expr.match(/^MAX\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (maxMatch) {
    const [, col1, row1, col2, row2] = maxMatch;
    return maxRange(col1, row1, col2, row2, getValue).toString();
  }

  // 4. MIN(plage)
  const minMatch = expr.match(/^MIN\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (minMatch) {
    const [, col1, row1, col2, row2] = minMatch;
    return minRange(col1, row1, col2, row2, getValue).toString();
  }

  // 5. NB(plage) - Compte les nombres
  const countMatch = expr.match(/^NB\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (countMatch) {
    const [, col1, row1, col2, row2] = countMatch;
    return countNumbers(col1, row1, col2, row2, getValue).toString();
  }

  // 6. NBVAL(plage) - Compte les non-vides
  const countValMatch = expr.match(/^NBVAL\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (countValMatch) {
    const [, col1, row1, col2, row2] = countValMatch;
    return countNonEmpty(col1, row1, col2, row2, getValue).toString();
  }

  // 7. SI(condition; valeur_si_vrai; valeur_si_faux)
  const ifMatch = expr.match(/^SI\((.+?);(.+?);(.+?)\)$/);
  if (ifMatch) {
    const [, condition, trueValue, falseValue] = ifMatch;
    const conditionResult = evaluateCondition(condition, getValue);
    return conditionResult ? trueValue.trim() : falseValue.trim();
  }

  // 8. SOMME.SI(plage; condition)
  const sumIfMatch = expr.match(
    /^SOMME\.SI\(([A-Z]+)(\d+):([A-Z]+)(\d+);(.+?)\)$/,
  );
  if (sumIfMatch) {
    const [, col1, row1, col2, row2, condition] = sumIfMatch;
    return sumIf(col1, row1, col2, row2, condition, getValue).toString();
  }

  // 9. CONCAT(plage)
  const concatMatch = expr.match(/^CONCAT\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (concatMatch) {
    const [, col1, row1, col2, row2] = concatMatch;
    return concatRange(col1, row1, col2, row2, getValue);
  }

  // 10. AUJOURDHUI()
  if (expr === "AUJOURDHUI()") {
    return new Date().toLocaleDateString("fr-FR");
  }

  // 11. MAINTENANT()
  if (expr === "MAINTENANT()") {
    return new Date().toLocaleString("fr-FR");
  }

  // 12. SIERREUR(valeur; valeur_si_erreur)
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

  // 13. ARRONDI(valeur; nombre_decimales)
  const roundMatch = expr.match(/^ARRONDI\((.+?);(\d+)\)$/);
  if (roundMatch) {
    const [, value, decimals] = roundMatch;
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return num.toFixed(parseInt(decimals));
    }
    return "#VALEUR!";
  }

  // 14. PUISSANCE(nombre; exposant)
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

  // 15. RECHERCHEV(valeur; plage; colonne; [exact])
  const vlookupMatch = expr.match(
    /^RECHERCHEV\((.+?);([A-Z]+)(\d+):([A-Z]+)(\d+);(\d+)(?:;(TRUE|FALSE))?\)$/,
  );
  if (vlookupMatch) {
    const [, searchValue, col1, row1, col2, row2, colIndex, exactMatch] =
      vlookupMatch;
    return vlookup(
      searchValue,
      col1,
      row1,
      col2,
      row2,
      parseInt(colIndex),
      exactMatch === "TRUE",
      getValue,
    );
  }

  // Support des opérations arithmétiques de base
  return evaluateArithmetic(expr, getValue);
};

// ============ FONCTIONS D'AIDE ============

const getRangeValues = (
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  getValue: (id: string) => string,
): string[] => {
  const startCol = col1.charCodeAt(0) - 65;
  const endCol = col2.charCodeAt(0) - 65;
  const startRow = parseInt(row1);
  const endRow = parseInt(row2);
  const values: string[] = [];

  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      const cellId = `${String.fromCharCode(65 + c)}${r}`;
      values.push(getValue(cellId));
    }
  }
  return values;
};

const getRangeNumbers = (
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  getValue: (id: string) => string,
): number[] => {
  return getRangeValues(col1, row1, col2, row2, getValue)
    .map((v) => parseFloat(v))
    .filter((v) => !isNaN(v));
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

const countNumbers = (
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  getValue: (id: string) => string,
): number => {
  return getRangeNumbers(col1, row1, col2, row2, getValue).length;
};

const countNonEmpty = (
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  getValue: (id: string) => string,
): number => {
  return getRangeValues(col1, row1, col2, row2, getValue).filter(
    (v) => v !== "",
  ).length;
};

const concatRange = (
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  getValue: (id: string) => string,
): string => {
  return getRangeValues(col1, row1, col2, row2, getValue)
    .filter((v) => v !== "")
    .join("");
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

const sumIf = (
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  condition: string,
  getValue: (id: string) => string,
): number => {
  const values = getRangeValues(col1, row1, col2, row2, getValue);
  let sum = 0;
  for (const val of values) {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      sum += num;
    }
  }
  return sum;
};

const vlookup = (
  searchValue: string,
  col1: string,
  row1: string,
  col2: string,
  row2: string,
  colIndex: number,
  exactMatch: boolean,
  getValue: (id: string) => string,
): string => {
  const startCol = col1.charCodeAt(0) - 65;
  const endCol = col2.charCodeAt(0) - 65;
  const startRow = parseInt(row1);
  const endRow = parseInt(row2);

  for (let r = startRow; r <= endRow; r++) {
    const firstColId = `${String.fromCharCode(65 + startCol)}${r}`;
    const firstVal = getValue(firstColId);

    if (
      exactMatch
        ? firstVal === searchValue
        : firstVal.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      const resultCol = startCol + colIndex - 1;
      if (resultCol <= endCol) {
        const resultId = `${String.fromCharCode(65 + resultCol)}${r}`;
        return getValue(resultId) || "#N/A";
      }
    }
  }
  return "#N/A";
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
    (set, get) => ({
      cells: new Map(),
      selectedCell: null,
      selectedRange: null,

      selectCell: (id: string) => {
        set({ selectedCell: id });
      },

      selectRange: (start: string, end: string) => {
        set({ selectedRange: { start, end } });
      },

      getCellValue: (id: string) => {
        const cell = get().cells.get(id);
        if (!cell) return "";
        // Convertir CellValue en string pour l'affichage
        if (cell.value === null) return "";
        if (typeof cell.value === "boolean")
          return cell.value ? "VRAI" : "FAUX";
        return cell.value.toString();
      },

      getDisplayValue: (id: string) => {
        const cell = get().cells.get(id);
        if (!cell) return "";
        // Priorité à display, sinon utiliser value
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

        // Détecter si c'est une formule
        const isFormula = value.startsWith("=");
        let display = value;
        let formula: string | undefined = undefined;

        if (isFormula) {
          formula = value;
          display = evaluateFormula(value, getCellValue);
        }

        // Convertir la valeur en CellValue
        let cellValue: CellValue = value;
        if (!isFormula) {
          // Essayer de convertir en nombre
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
        }

        const newCells = new Map(cells);
        const existing = newCells.get(id) || {
          value: null,
          display: "",
          style: { ...defaultStyle },
        };

        newCells.set(id, {
          ...existing,
          value: cellValue,
          display,
          formula,
        });

        set({ cells: newCells });

        // Recalculer les formules dépendantes
        const allCells = Array.from(newCells.entries());
        let needsUpdate = true;
        let iterations = 0;
        const maxIterations = 50;

        while (needsUpdate && iterations < maxIterations) {
          needsUpdate = false;
          iterations++;

          for (const [cellId, data] of allCells) {
            if (data.formula) {
              const newDisplay = evaluateFormula(data.formula, (refId) => {
                const ref = newCells.get(refId);
                if (!ref) return "";
                if (ref.value === null) return "";
                if (typeof ref.value === "boolean")
                  return ref.value ? "VRAI" : "FAUX";
                return ref.value.toString();
              });
              if (newDisplay !== data.display) {
                newCells.set(cellId, { ...data, display: newDisplay });
                needsUpdate = true;
              }
            }
          }
        }

        set({ cells: newCells });
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
    { name: "SpreadsheetStore" },
  ),
);
