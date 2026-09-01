// src/components/spreadsheet/RangeSelector.tsx

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useStore } from "@/src/store/spreadsheetstore";
import styles from "./RangeSelector.module.css";

interface RangeSelectorProps {
  onRangeSelect?: (start: string, end: string) => void;
  onClose?: () => void;
}

export const RangeSelector = ({
  onRangeSelect,
  onClose,
}: RangeSelectorProps) => {
  const [startCell, setStartCell] = useState("");
  const [endCell, setEndCell] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const [stats, setStats] = useState<{
    sum: number;
    average: number;
    count: number;
    max: number;
    min: number;
    nonEmpty: number;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { selectedRange, selectRange, getRangeStats, getRangeCells } =
    useStore();

  // Mettre à jour les stats quand la plage change
  useEffect(() => {
    if (selectedRange) {
      const rangeStats = getRangeStats(selectedRange.start, selectedRange.end);
      setStats(rangeStats);
      setStartCell(selectedRange.start);
      setEndCell(selectedRange.end);
    } else {
      setStats(null);
    }
  }, [selectedRange, getRangeStats]);

  // Fonction pour valider le format d'une cellule (ex: A1, B2, Z100)
  const isValidCell = (cell: string): boolean => {
    return /^[A-Z]+\d+$/.test(cell.toUpperCase());
  };

  // Fonction pour convertir en majuscules
  const normalizeCell = (cell: string): string => {
    return cell.toUpperCase().trim();
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeCell(e.target.value);
    setStartCell(value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeCell(e.target.value);
    setEndCell(value);
  };

  const handleApplyRange = () => {
    const start = normalizeCell(startCell);
    const end = normalizeCell(endCell);

    if (start && end && isValidCell(start) && isValidCell(end)) {
      selectRange(start, end);
      if (onRangeSelect) {
        onRangeSelect(start, end);
      }
    } else {
      alert("Format invalide. Utilisez le format A1, B2, etc.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApplyRange();
    }
    if (e.key === "Escape" && onClose) {
      onClose();
    }
  };

  // Utiliser la plage actuelle
  const useCurrentRange = () => {
    if (selectedRange) {
      setStartCell(selectedRange.start);
      setEndCell(selectedRange.end);
    }
  };

  // Remplir avec une formule de somme
  const insertSumFormula = () => {
    if (selectedRange) {
      const { start, end } = selectedRange;
      const formula = `=SOMME(${start}:${end})`;
      const targetCell = prompt("Cellule cible pour la formule:", "A1");
      if (targetCell && isValidCell(targetCell)) {
        const { setCellValue } = useStore.getState();
        setCellValue(normalizeCell(targetCell), formula);
        if (onClose) onClose();
      }
    }
  };

  // Remplir avec une formule de moyenne
  const insertAverageFormula = () => {
    if (selectedRange) {
      const { start, end } = selectedRange;
      const formula = `=MOYENNE(${start}:${end})`;
      const targetCell = prompt("Cellule cible pour la formule:", "A1");
      if (targetCell && isValidCell(targetCell)) {
        const { setCellValue } = useStore.getState();
        setCellValue(normalizeCell(targetCell), formula);
        if (onClose) onClose();
      }
    }
  };

  // Vider la plage
  const clearRange = () => {
    if (
      selectedRange &&
      confirm(`Vider la plage ${selectedRange.start}:${selectedRange.end} ?`)
    ) {
      const { clearRange: clearRangeAction } = useStore.getState();
      clearRangeAction(selectedRange.start, selectedRange.end);
      if (onClose) onClose();
    }
  };

  return (
    <div className={styles.rangeSelector} onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>📊 Sélection de plage</span>
        {onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        )}
      </div>

      {/* Inputs */}
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <label>De</label>
          <input
            ref={inputRef}
            type="text"
            value={startCell}
            onChange={handleStartChange}
            placeholder="A1"
            className={styles.cellInput}
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
        </div>
        <span className={styles.separator}>→</span>
        <div className={styles.inputWrapper}>
          <label>À</label>
          <input
            type="text"
            value={endCell}
            onChange={handleEndChange}
            placeholder="Z100"
            className={styles.cellInput}
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
        </div>
        <button
          className={styles.applyButton}
          onClick={handleApplyRange}
          disabled={!startCell || !endCell}
        >
          Appliquer
        </button>
      </div>

      {/* Plage actuelle */}
      {selectedRange && (
        <div className={styles.currentRange}>
          <span className={styles.rangeLabel}>Plage actuelle:</span>
          <span className={styles.rangeValue}>
            {selectedRange.start} : {selectedRange.end}
            <span className={styles.rangeCount}>
              ({getRangeCells(selectedRange.start, selectedRange.end).length}{" "}
              cellules)
            </span>
          </span>
          <button className={styles.useCurrentButton} onClick={useCurrentRange}>
            Utiliser
          </button>
        </div>
      )}

      {/* Statistiques */}
      {stats && (
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Somme</span>
            <span className={styles.statValue}>
              {stats.sum.toLocaleString()}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Moyenne</span>
            <span className={styles.statValue}>
              {stats.average.toLocaleString()}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Max</span>
            <span className={styles.statValue}>
              {stats.max.toLocaleString()}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Min</span>
            <span className={styles.statValue}>
              {stats.min.toLocaleString()}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Cellules</span>
            <span className={styles.statValue}>{stats.count}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Non vides</span>
            <span className={styles.statValue}>{stats.nonEmpty}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={insertSumFormula}
          disabled={!selectedRange}
        >
          ➕ SOMME
        </button>
        <button
          className={styles.actionButton}
          onClick={insertAverageFormula}
          disabled={!selectedRange}
        >
          📊 MOYENNE
        </button>
        <button
          className={`${styles.actionButton} ${styles.danger}`}
          onClick={clearRange}
          disabled={!selectedRange}
        >
          🗑️ Vider
        </button>
      </div>

      {/* Aide */}
      <div className={styles.hint}>
        <p>💡 Cliquez sur une cellule pour la sélectionner</p>
        <p>📌 Format: A1, B2, ..., Z100</p>
        <p>🔄 Glissez pour sélectionner une plage</p>
      </div>
    </div>
  );
};
