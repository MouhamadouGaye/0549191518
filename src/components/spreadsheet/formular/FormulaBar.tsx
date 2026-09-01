// // src/components/spreadsheet/formular/FormulaBar.tsx

// "use client";

// import { useState, useEffect, useCallback, useMemo } from "react";
// import styles from "./FormulaBar.module.css";
// import { useStore } from "@/src/store/spreadsheetstore";
// import { CellValue } from "@/src/store/types";

// export const FormulaBar = () => {
//   const { selectedCell, cells, setCellValue, getCellValue } = useStore();
//   const [value, setValue] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

//   // Récupérer les données de la cellule sélectionnée
//   const cellData = useMemo(() => {
//     if (!selectedCell) return null;
//     return cells.get(selectedCell) || null;
//   }, [selectedCell, cells]);

//   // Fonction pour obtenir la valeur affichée de la cellule
//   const getCellDisplayValue = useCallback(() => {
//     if (!cellData) return "";

//     // Si c'est une formule, on affiche la formule dans la barre
//     if (cellData.formula) {
//       return cellData.formula;
//     }

//     // Sinon on affiche la valeur brute
//     if (cellData.value === null) return "";
//     if (typeof cellData.value === "boolean") {
//       return cellData.value ? "VRAI" : "FAUX";
//     }
//     return cellData.value.toString();
//   }, [cellData]);

//   // Mettre à jour l'input quand la cellule change
//   useEffect(() => {
//     if (selectedCell) {
//       const displayValue = getCellDisplayValue();
//       setValue(displayValue);
//     } else {
//       setValue("");
//     }
//   }, [selectedCell, cellData, getCellDisplayValue]);

//   // Gérer la validation (Enter)
//   const handleKeyDown = useCallback(
//     (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === "Enter" && selectedCell) {
//         e.preventDefault();
//         setCellValue(selectedCell, value);
//         // Optionnel : déplacer vers le bas après validation
//         // selectCell(selectedCell); // À décommenter si besoin
//       }
//       if (e.key === "Escape" && selectedCell) {
//         e.preventDefault();
//         // Restaurer la valeur précédente
//         const displayValue = getCellDisplayValue();
//         setValue(displayValue);
//         setIsFocused(false);
//       }
//     },
//     [selectedCell, value, setCellValue, getCellDisplayValue],
//   );

//   // Gérer le focus
//   const handleFocus = useCallback(() => {
//     setIsFocused(true);
//   }, []);

//   const handleBlur = useCallback(() => {
//     setIsFocused(false);
//     // Sauvegarder automatiquement si la valeur a changé
//     if (selectedCell) {
//       const currentValue = getCellDisplayValue();
//       if (value !== currentValue) {
//         setCellValue(selectedCell, value);
//       }
//     }
//   }, [selectedCell, value, setCellValue, getCellDisplayValue]);

//   // Récupérer le type de la cellule pour l'affichage
//   const getCellType = useCallback(() => {
//     if (!cellData) return "";
//     if (cellData.formula) return "📐 Formule";
//     if (cellData.value === null) return "⬜ Vide";
//     if (typeof cellData.value === "number") return "🔢 Nombre";
//     if (typeof cellData.value === "boolean") return "⚖️ Booléen";
//     return "📝 Texte";
//   }, [cellData]);

//   // Récupérer le résultat affiché
//   const getDisplayResult = useCallback(() => {
//     if (!cellData) return "";
//     if (cellData.display) {
//       return `= ${cellData.display}`;
//     }
//     if (cellData.value === null) return "";
//     if (typeof cellData.value === "boolean") {
//       return cellData.value ? "VRAI" : "FAUX";
//     }
//     return cellData.value.toString();
//   }, [cellData]);

//   return (
//     <div className={`${styles.formulaBar} ${isFocused ? styles.focused : ""}`}>
//       {/* Référence de la cellule */}
//       <div className={styles.cellReference}>
//         <span className={styles.cellReferenceText}>
//           {selectedCell || "..."}
//         </span>
//         {cellData && (
//           <span className={styles.cellType} title="Type de la cellule">
//             {getCellType()}
//           </span>
//         )}
//       </div>

//       <div className={styles.separator} />

//       {/* Input de formule */}
//       <div className={styles.inputWrapper}>
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           className={styles.formulaInput}
//           placeholder="Saisissez une valeur ou une formule (=SOMME(A1:A10))"
//           spellCheck={false}
//           autoComplete="off"
//         />
//         {cellData && cellData.formula && (
//           <span className={styles.resultPreview} title="Résultat de la formule">
//             → {getDisplayResult()}
//           </span>
//         )}
//       </div>

//       {/* Boutons d'action rapide */}
//       <div className={styles.actions}>
//         <button
//           className={styles.actionButton}
//           onClick={() => {
//             if (selectedCell) {
//               setCellValue(selectedCell, value);
//             }
//           }}
//           title="Valider (Enter)"
//         >
//           ✓
//         </button>
//         <button
//           className={styles.actionButton}
//           onClick={() => {
//             if (selectedCell) {
//               const displayValue = getCellDisplayValue();
//               setValue(displayValue);
//             }
//           }}
//           title="Annuler (Escape)"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   );
// };
// src/components/spreadsheet/formular/FormulaBar.tsx

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./FormulaBar.module.css";
import { useStore } from "@/src/store/spreadsheetstore";

export const FormulaBar = () => {
  const { selectedCell, cells, setCellValue, getCellValue } = useStore();
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Récupérer les données de la cellule sélectionnée
  const cellData = useMemo(() => {
    if (!selectedCell) return null;
    return cells.get(selectedCell) || null;
  }, [selectedCell, cells]);

  // Fonction pour obtenir la valeur affichée de la cellule
  const getCellDisplayValue = useCallback(() => {
    if (!cellData) return "";

    if (cellData.formula) {
      return cellData.formula;
    }

    if (cellData.value === null) return "";
    if (typeof cellData.value === "boolean") {
      return cellData.value ? "VRAI" : "FAUX";
    }
    return cellData.value.toString();
  }, [cellData]);

  // Mettre à jour l'input quand la cellule change
  useEffect(() => {
    if (selectedCell) {
      const displayValue = getCellDisplayValue();
      setValue(displayValue);
    } else {
      setValue("");
    }
  }, [selectedCell, cellData, getCellDisplayValue]);

  // Gérer la validation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && selectedCell) {
        e.preventDefault();
        setCellValue(selectedCell, value);
      }
      if (e.key === "Escape" && selectedCell) {
        e.preventDefault();
        const displayValue = getCellDisplayValue();
        setValue(displayValue);
        setIsFocused(false);
      }
    },
    [selectedCell, value, setCellValue, getCellDisplayValue],
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (selectedCell) {
      const currentValue = getCellDisplayValue();
      if (value !== currentValue) {
        setCellValue(selectedCell, value);
      }
    }
  }, [selectedCell, value, setCellValue, getCellDisplayValue]);

  const getCellType = useCallback(() => {
    if (!cellData) return "";
    if (cellData.formula) return "📐 Formule";
    if (cellData.value === null) return "⬜ Vide";
    if (typeof cellData.value === "number") return "🔢 Nombre";
    if (typeof cellData.value === "boolean") return "⚖️ Booléen";
    return "📝 Texte";
  }, [cellData]);

  const getDisplayResult = useCallback(() => {
    if (!cellData) return "";
    if (cellData.display) {
      return `= ${cellData.display}`;
    }
    if (cellData.value === null) return "";
    if (typeof cellData.value === "boolean") {
      return cellData.value ? "VRAI" : "FAUX";
    }
    return cellData.value.toString();
  }, [cellData]);

  return (
    <div className={`${styles.formulaBar} ${isFocused ? styles.focused : ""}`}>
      <div className={styles.cellReference}>
        <span className={styles.cellReferenceText}>
          {selectedCell || "..."}
        </span>
        {cellData && (
          <span className={styles.cellType} title="Type de la cellule">
            {getCellType()}
          </span>
        )}
      </div>

      <div className={styles.separator} />

      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.formulaInput}
          placeholder="Saisissez une valeur ou une formule (=SOMME(A1:A10))"
          spellCheck={false}
          autoComplete="off"
        />
        {cellData && cellData.formula && (
          <span className={styles.resultPreview} title="Résultat de la formule">
            → {getDisplayResult()}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={() => {
            if (selectedCell) {
              setCellValue(selectedCell, value);
            }
          }}
          title="Valider (Enter)"
        >
          ✓
        </button>
        <button
          className={styles.actionButton}
          onClick={() => {
            if (selectedCell) {
              const displayValue = getCellDisplayValue();
              setValue(displayValue);
            }
          }}
          title="Annuler (Escape)"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
