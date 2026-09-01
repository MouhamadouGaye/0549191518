// export interface CellStyle {
//   bold: boolean;
//   italic: boolean;
//   underline: boolean;
//   strikethrough: boolean;
//   bgColor: string;
//   textColor: string;
//   align: "left" | "center" | "right";
//   fontSize: number;
//   fontFamily: string;
// }

// export interface CellData {
//   value: string;
//   display: string;
//   style: CellStyle;
//   format?: "text" | "number" | "percent" | "currency" | "date" | "time";
//   validation?: {
//     type: "number" | "text" | "list" | "date";
//     min?: number;
//     max?: number;
//     list?: string[];
//   };
// }

// export interface Range {
//   startRow: number;
//   startCol: number;
//   endRow: number;
//   endCol: number;
// }

// export interface CellPosition {
//   row: number;
//   col: number;
//   id: string;
// }

// export type Alignment = "left" | "center" | "right";

// export interface FormulaFunction {
//   name: string;
//   description: string;
//   syntax: string;
//   example: string;
//   category: "Math" | "Text" | "Date" | "Logical" | "Lookup";
// }

// src/store/types.ts

// ============ TYPES DE BASE ============

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

// ============ STYLE ============

export interface CellStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  bgColor: string; // Couleur hexadécimale (#ffffff)
  textColor: string; // Couleur hexadécimale (#000000)
  align: Alignment;
  fontSize: number;
  fontFamily: string;
  // Extras utiles
  wrapText?: boolean;
  shrinkToFit?: boolean;
  indent?: number;
  rotation?: number; // Rotation du texte en degrés
}

// ============ VALIDATION (Union discriminée) ============

export type CellValidation =
  | {
      type: "number";
      min?: number;
      max?: number;
      step?: number;
      allowDecimal?: boolean;
    }
  | {
      type: "text";
      minLength?: number;
      maxLength?: number;
      pattern?: string; // Regex pour validation
    }
  | {
      type: "list";
      list: string[];
      allowCustom?: boolean;
    }
  | {
      type: "date";
      min?: string;
      max?: string;
      format?: string;
    }
  | {
      type: "time";
      min?: string;
      max?: string;
    }
  | {
      type: "boolean";
    }
  | {
      type: "custom";
      formula: string; // Formule personnalisée pour validation
    };

// ============ CELLULE ============

export interface CellData {
  // Valeur brute (ce que l'utilisateur tape)
  value: CellValue;

  // Valeur affichée (résultat de la formule ou formatée)
  display: string;

  // Formule (si présente, value est le résultat)
  formula?: string;

  // Style de la cellule
  style: CellStyle;

  // Format d'affichage
  format?: CellFormat;

  // Règles de validation
  validation?: CellValidation;

  // Métadonnées (utiles pour l'historique)
  metadata?: {
    lastModified: string;
    modifiedBy?: string;
    comment?: string;
  };

  // Lien hypertexte
  hyperlink?: {
    url: string;
    text?: string;
  };
}

// ============ PLAGES ET POSITIONS ============

export interface Range {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export interface CellPosition {
  row: number;
  col: number;
  id: string; // "A1"
}

// ============ FORMULES ============

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

// ============ HISTORIQUE ============

export interface HistoryAction {
  id: string;
  type: "cellValue" | "cellStyle" | "range" | "batch";
  timestamp: string;
  undo: () => void;
  redo: () => void;
  payload: any;
}

// ============ CONFIGURATION ============

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
