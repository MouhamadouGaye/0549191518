// export type Alignment = "left" | "center" | "right";

// export type CellFormat =
//   | "text"
//   | "number"
//   | "percent"
//   | "currency"
//   | "date"
//   | "time"
//   | "datetime";

// export type CellValue = string | number | boolean | null;

// export type FormulaCategory =
//   | "Math"
//   | "Text"
//   | "Date"
//   | "Logical"
//   | "Lookup"
//   | "Statistical"
//   | "Information";

// // ============ STYLE ============

// export interface CellStyle {
//   bold: boolean;
//   italic: boolean;
//   underline: boolean;
//   strikethrough: boolean;
//   bgColor: string; // Couleur hexadécimale (#ffffff)
//   textColor: string; // Couleur hexadécimale (#000000)
//   align: Alignment;
//   fontSize: number;
//   fontFamily: string;
//   // Extras utiles
//   wrapText?: boolean;
//   shrinkToFit?: boolean;
//   indent?: number;
//   rotation?: number; // Rotation du texte en degrés
// }

// // ============ VALIDATION (Union discriminée) ============

// export type CellValidation =
//   | {
//       type: "number";
//       min?: number;
//       max?: number;
//       step?: number;
//       allowDecimal?: boolean;
//     }
//   | {
//       type: "text";
//       minLength?: number;
//       maxLength?: number;
//       pattern?: string; // Regex pour validation
//     }
//   | {
//       type: "list";
//       list: string[];
//       allowCustom?: boolean;
//     }
//   | {
//       type: "date";
//       min?: string;
//       max?: string;
//       format?: string;
//     }
//   | {
//       type: "time";
//       min?: string;
//       max?: string;
//     }
//   | {
//       type: "boolean";
//     }
//   | {
//       type: "custom";
//       formula: string; // Formule personnalisée pour validation
//     };

// // ============ CELLULE ============

// export interface CellData {
//   // Valeur brute (ce que l'utilisateur tape)
//   value: CellValue;

//   // Valeur affichée (résultat de la formule ou formatée)
//   display: string;

//   // Formule (si présente, value est le résultat)
//   formula?: string;

//   // Style de la cellule
//   style: CellStyle;

//   // Format d'affichage
//   format?: CellFormat;

//   // Règles de validation
//   validation?: CellValidation;

//   // Métadonnées (utiles pour l'historique)
//   metadata?: {
//     lastModified: string;
//     modifiedBy?: string;
//     comment?: string;
//   };

//   // Lien hypertexte
//   hyperlink?: {
//     url: string;
//     text?: string;
//   };
// }

// // ============ PLAGES ET POSITIONS ============

// export interface Range {
//   startRow: number;
//   startCol: number;
//   endRow: number;
//   endCol: number;
// }

// export interface CellPosition {
//   row: number;
//   col: number;
//   id: string; // "A1"
// }

// // ============ FORMULES ============

// export interface FormulaFunction {
//   name: string;
//   description: string;
//   syntax: string;
//   example: string;
//   category: FormulaCategory;
//   returns: CellFormat;
//   parameters: {
//     name: string;
//     description: string;
//     type: CellFormat;
//     required: boolean;
//     defaultValue?: CellValue;
//   }[];
// }

// // ============ HISTORIQUE ============

// export interface HistoryAction {
//   id: string;
//   type: "cellValue" | "cellStyle" | "range" | "batch";
//   timestamp: string;
//   undo: () => void;
//   redo: () => void;
//   payload: any;
// }

// // ============ CONFIGURATION ============

// export interface SpreadsheetConfig {
//   rows: number;
//   cols: number;
//   defaultCellWidth: number;
//   defaultCellHeight: number;
//   showGridlines: boolean;
//   showHeaders: boolean;
//   freezeRows: number;
//   freezeCols: number;
//   zoom: number;
//   theme: "light" | "dark" | "system";
// }
// ============ TYPES ============
export type Alignment = "left" | "center" | "right";

export type CellFormat =
  | "text"
  | "number"
  | "percent"
  | "currency"
  | "date"
  | "time"
  | "datetime";

export type CellValue = string | number | boolean | null;

export type FormulaCategory =
  | "Math"
  | "Text"
  | "Date"
  | "Logical"
  | "Lookup"
  | "Statistical"
  | "Information";

export interface CellStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  bgColor: string;
  textColor: string;
  align: Alignment;
  fontSize: number;
  fontFamily: string;
  wrapText?: boolean;
  shrinkToFit?: boolean;
  indent?: number;
  rotation?: number;
}

export type CellValidation =
  | {
      type: "number";
      min?: number;
      max?: number;
      step?: number;
      allowDecimal?: boolean;
    }
  | { type: "text"; minLength?: number; maxLength?: number; pattern?: string }
  | { type: "list"; list: string[]; allowCustom?: boolean }
  | { type: "date"; min?: string; max?: string; format?: string }
  | { type: "time"; min?: string; max?: string }
  | { type: "boolean" }
  | { type: "custom"; formula: string };

export interface CellData {
  value: CellValue;
  display: string;
  formula?: string;
  style: CellStyle;
  format?: CellFormat;
  validation?: CellValidation;
  metadata?: { lastModified: string; modifiedBy?: string; comment?: string };
  hyperlink?: { url: string; text?: string };
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
  id: string;
}

export interface FormulaFunction {
  name: string;
  description: string;
  syntax: string;
  example: string;
  category: FormulaCategory;
  returns: CellFormat;
  parameters: {
    name: string;
    description: string;
    type: CellFormat;
    required: boolean;
    defaultValue?: CellValue;
  }[];
}

export interface HistoryAction {
  id: string;
  type: "cellValue" | "cellStyle" | "range" | "batch";
  timestamp: string;
  undo: () => void;
  redo: () => void;
  payload: any;
}

export interface SpreadsheetConfig {
  rows: number;
  cols: number;
  defaultCellWidth: number;
  defaultCellHeight: number;
  showGridlines: boolean;
  showHeaders: boolean;
  freezeRows: number;
  freezeCols: number;
  zoom: number;
  theme: "light" | "dark" | "system";
}

// ============ STYLE PAR DÉFAUT ============
export const defaultStyle: CellStyle = {
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
export interface SpreadsheetStore {
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

  // Presse-papiers
  copyRange: (start: string, end: string) => void;
  cutRange: (start: string, end: string) => void;
  pasteRange: (targetCell: string) => void;
  copyToClipboard: (text: string) => void;
  getClipboardData: () => { data: any[]; type: "copy" | "cut" } | null;
  clearClipboard: () => void;

  // Styles de texte
  increaseFontSize: (cellId: string) => void;
  decreaseFontSize: (cellId: string) => void;
  setFontFamily: (cellId: string, fontFamily: string) => void;

  // Pour les performances
  _updateQueue: Map<string, CellData>;
  _flushUpdates: () => void;
}
