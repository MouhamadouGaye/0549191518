// store/types.ts

export interface CellStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  bgColor: string;
  textColor: string;
  align: "left" | "center" | "right";
  fontSize: number;
  fontFamily: string;
}

export interface CellData {
  value: string; // La valeur brute (ex: "=A1+B2" ou "42")
  display: string; // La valeur affichée (ex: "42" ou "#ERREUR")
  style: CellStyle;
  format?: "text" | "number" | "percent" | "currency" | "date";
  validation?: {
    type: "number" | "text" | "list";
    min?: number;
    max?: number;
    list?: string[];
  };
}

export interface Range {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export interface CellPosition {
  row: number;
  col: number;
  id: string; // "A1", "B2", etc.
}

export type Alignment = "left" | "center" | "right";

// Type pour les fonctions de formules
export type FormulaFunction = (...args: any[]) => number | string;

// Type pour l'historique (Undo/Redo)
export interface HistoryAction {
  type: "cellValue" | "cellStyle" | "batch";
  payload: any;
  undo: () => void;
  redo: () => void;
}
