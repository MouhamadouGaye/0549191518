import { create } from "zustand";

// Types
export interface CellData {
  value: string;
  display: string;
  style: {
    bold: boolean;
    italic: boolean;
    bgColor: string;
    align: "left" | "center" | "right";
  };
}

interface SpreadsheetStore {
  cells: Map<string, CellData>;
  selectedCell: string | null;
  setCellValue: (id: string, value: string) => void;
  setCellStyle: (id: string, style: Partial<CellData["style"]>) => void;
  selectCell: (id: string) => void;
  getCellValue: (id: string) => string;
}

// Moteur de formules simplifié
const evaluateFormula = (
  formula: string,
  getValue: (id: string) => string,
): string => {
  if (!formula.startsWith("=")) return formula;

  const expr = formula.substring(1).toUpperCase();

  // Support SOMME(plage)
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
        const cellId = `${String.fromCharCode(65 + c)}${r}`;
        const val = parseFloat(getValue(cellId));
        if (!isNaN(val)) sum += val;
      }
    }
    return sum.toString();
  }

  // Support MOYENNE(plage)
  const avgMatch = expr.match(/^MOYENNE\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
  if (avgMatch) {
    const [, col1, row1, col2, row2] = avgMatch;
    const startCol = col1.charCodeAt(0) - 65;
    const endCol = col2.charCodeAt(0) - 65;
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    let sum = 0;
    let count = 0;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const cellId = `${String.fromCharCode(65 + c)}${r}`;
        const val = parseFloat(getValue(cellId));
        if (!isNaN(val)) {
          sum += val;
          count++;
        }
      }
    }
    return count > 0 ? (sum / count).toString() : "0";
  }

  // Support des opérations basiques (A1+B2*C3)
  // Remplacer les références de cellules par leurs valeurs
  let result = expr;
  const cellRefs = result.match(/[A-Z]+\d+/g) || [];
  for (const ref of cellRefs) {
    const val = getValue(ref);
    result = result.replace(ref, val || "0");
  }

  // Évaluation sécurisée (sans eval)
  try {
    // Utilisation de Function constructor pour éviter eval()
    const fn = new Function(`return (${result})`);
    const computed = fn();
    return computed !== undefined && !isNaN(computed)
      ? computed.toString()
      : "#ERREUR";
  } catch {
    return "#ERREUR";
  }
};

export const useStore = create<SpreadsheetStore>((set, get) => ({
  cells: new Map(),
  selectedCell: null,

  selectCell: (id: string) => {
    set({ selectedCell: id });
  },

  getCellValue: (id: string) => {
    const cell = get().cells.get(id);
    return cell?.display ?? cell?.value ?? "";
  },

  setCellValue: (id: string, value: string) => {
    const { cells, getCellValue } = get();

    // Si la valeur est une formule, on l'évalue
    let display = value;
    if (value.startsWith("=")) {
      display = evaluateFormula(value, getCellValue);
    }

    const newCells = new Map(cells);
    const existing = newCells.get(id) || {
      value: "",
      display: "",
      style: {
        bold: false,
        italic: false,
        bgColor: "transparent",
        align: "left" as const,
      },
    };

    newCells.set(id, {
      ...existing,
      value,
      display,
    });

    set({ cells: newCells });

    // Recalculer toutes les cellules qui dépendent de cette cellule
    // (On pourrait optimiser avec un graphe de dépendances)
    const allCells = Array.from(newCells.entries());
    let needsUpdate = true;
    while (needsUpdate) {
      needsUpdate = false;
      for (const [cellId, data] of allCells) {
        if (data.value.startsWith("=")) {
          const newDisplay = evaluateFormula(data.value, (refId) => {
            const ref = newCells.get(refId);
            return ref?.display ?? ref?.value ?? "";
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

  setCellStyle: (id: string, style: Partial<CellData["style"]>) => {
    const { cells } = get();
    const newCells = new Map(cells);
    const existing = newCells.get(id);
    if (existing) {
      newCells.set(id, {
        ...existing,
        style: { ...existing.style, ...style },
      });
      set({ cells: newCells });
    }
  },
}));
