"use client";

import { useState, useCallback, useMemo } from "react";
import { useStore } from "@/src/store/spreadsheetstore";
import { RangeSelector } from "../range/RangeSelector";
import styles from "./Toolbar.module.css";
import { CellStyle } from "@/src/store/types";

export const ToolBar = () => {
  const [showRangeSelector, setShowRangeSelector] = useState(false);

  const selectedCell = useStore((state) => state.selectedCell);
  const selectedRange = useStore((state) => state.selectedRange);
  const cellData = useStore((state) =>
    selectedCell ? state.cells.get(selectedCell) : null,
  );
  const setCellStyle = useStore((state) => state.setCellStyle);
  const applyStyleToRange = useStore((state) => state.applyStyleToRange);
  const clearRange = useStore((state) => state.clearRange);
  const selectRange = useStore((state) => state.selectRange);

  // Vérifier si une plage est sélectionnée
  const hasRange = !!selectedRange;
  const hasSelection = !!selectedCell || hasRange;

  // Appliquer le style à la plage ou à la cellule
  const applyStyle = useCallback(
    (style: Partial<CellStyle>) => {
      if (hasRange && selectedRange) {
        // ✅ Appliquer à TOUTE la plage
        applyStyleToRange(selectedRange.start, selectedRange.end, style);
      } else if (selectedCell) {
        // ✅ Appliquer à la cellule seule
        setCellStyle(selectedCell, style);
      }
    },
    [hasRange, selectedRange, selectedCell, applyStyleToRange, setCellStyle],
  );

  // Déterminer l'état du style (pour l'affichage des boutons)
  const getStyleState = useCallback(
    (key: keyof CellStyle) => {
      if (hasRange && selectedRange) {
        // Vérifier si le style est cohérent sur toute la plage
        const cells = useStore
          .getState()
          .getRangeCells(selectedRange.start, selectedRange.end);
        const styles = cells.map((id) => {
          const data = useStore.getState().cells.get(id);
          return data?.style?.[key];
        });
        const uniqueStyles = [...new Set(styles)];
        // Si tous les styles sont identiques, retourner cette valeur
        if (uniqueStyles.length === 1) {
          return uniqueStyles[0];
        }
        // Sinon, retourner undefined (état mixte)
        return undefined;
      }
      return cellData?.style?.[key];
    },
    [hasRange, selectedRange, cellData],
  );

  const toggleBold = useCallback(() => {
    const currentBold = getStyleState("bold");
    applyStyle({ bold: !currentBold });
  }, [getStyleState, applyStyle]);

  const toggleItalic = useCallback(() => {
    const currentItalic = getStyleState("italic");
    applyStyle({ italic: !currentItalic });
  }, [getStyleState, applyStyle]);

  const toggleUnderline = useCallback(() => {
    const currentUnderline = getStyleState("underline");
    applyStyle({ underline: !currentUnderline });
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

  // Info de sélection
  const getSelectionInfo = useMemo(() => {
    if (selectedRange) {
      const cells = useStore
        .getState()
        .getRangeCells(selectedRange.start, selectedRange.end);
      return `Plage: ${selectedRange.start}:${selectedRange.end} (${cells.length} cellules)`;
    }
    if (selectedCell) {
      return `Cellule: ${selectedCell}`;
    }
    return "Aucune sélection";
  }, [selectedCell, selectedRange]);

  // Vérifier si un style est actif (pour les boutons)
  const isStyleActive = useCallback(
    (key: keyof CellStyle, value: any) => {
      const currentValue = getStyleState(key);
      return currentValue === value;
    },
    [getStyleState],
  );

  return (
    <>
      <div className={styles.toolbar}>
        {/* Sélecteur de plage */}
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
              className={styles.toolbarButton}
              onClick={() => {
                if (selectedRange) {
                  // Réafficher la plage dans la console ou un tooltip
                  console.log(
                    `Plage sélectionnée: ${selectedRange.start}:${selectedRange.end}`,
                  );
                }
              }}
              title="Voir la plage"
            >
              🔍
            </button>
          )}
        </div>

        <div className={styles.separator} />

        {/* Styles de texte */}
        <div className={styles.toolbarGroup}>
          <button
            className={`${styles.toolbarButton} ${isStyleActive("bold", true) ? styles.active : ""}`}
            onClick={toggleBold}
            title="Gras (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            className={`${styles.toolbarButton} ${isStyleActive("italic", true) ? styles.active : ""}`}
            onClick={toggleItalic}
            title="Italique (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            className={`${styles.toolbarButton} ${isStyleActive("underline", true) ? styles.active : ""}`}
            onClick={toggleUnderline}
            title="Souligné (Ctrl+U)"
          >
            <u>U</u>
          </button>
        </div>

        <div className={styles.separator} />

        {/* Alignement */}
        <div className={styles.toolbarGroup}>
          <button
            className={`${styles.toolbarButton} ${isStyleActive("align", "left") ? styles.active : ""}`}
            onClick={() => setAlignment("left")}
            title="Aligner à gauche"
          >
            ≡
          </button>
          <button
            className={`${styles.toolbarButton} ${isStyleActive("align", "center") ? styles.active : ""}`}
            onClick={() => setAlignment("center")}
            title="Centrer"
          >
            ☰
          </button>
          <button
            className={`${styles.toolbarButton} ${isStyleActive("align", "right") ? styles.active : ""}`}
            onClick={() => setAlignment("right")}
            title="Aligner à droite"
          >
            ≡
          </button>
        </div>

        <div className={styles.separator} />

        {/* Couleurs */}
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

        {/* Actions sur la plage */}
        {hasRange && (
          <div className={styles.toolbarGroup}>
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
          </div>
        )}

        {/* Info */}
        <div className={styles.toolbarGroup} style={{ marginLeft: "auto" }}>
          <span className={styles.cellInfo}>
            {getSelectionInfo}
            {hasRange && selectedRange && (
              <span
                style={{ marginLeft: 8, color: "#34a853", fontSize: "11px" }}
              >
                {
                  useStore
                    .getState()
                    .getRangeCells(selectedRange.start, selectedRange.end)
                    .length
                }{" "}
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
