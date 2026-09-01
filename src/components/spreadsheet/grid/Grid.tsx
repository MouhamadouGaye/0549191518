// src/components/spreadsheet/grid/Grid.tsx

"use client";

import { useEffect, useState, useCallback, useRef, useMemo, memo } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { Cell } from "../cell/Cell";
import { useStore } from "@/src/store/spreadsheetstore";
import styles from "./Grid.module.css";

interface GridProps {
  rows?: number;
  cols?: number;
}

const COLUMN_WIDTH = 80;
const ROW_HEIGHT = 32;
const HEADER_HEIGHT = 32;
const HEADER_WIDTH = 40;

// Composant de ligne mémoisé
const DataRow = memo(({ rowIndex, cells, onCellClick, scrollLeft }: any) => {
  return (
    <div
      className={styles.dataRow}
      style={{
        transform: `translateX(-${scrollLeft}px)`,
        transition: "transform 0.05s ease",
      }}
    >
      {/* Numéro de ligne - TOUJOURS FIXE */}
      <div
        className={styles.rowHeader}
        style={{
          position: "sticky",
          left: 0,
          zIndex: 5,
          background: "#f8f9fa",
          minWidth: HEADER_WIDTH,
          width: HEADER_WIDTH,
          height: ROW_HEIGHT,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid #dadce0",
          fontSize: "12px",
          color: "#5f6368",
          userSelect: "none",
        }}
      >
        {rowIndex + 1}
      </div>

      {/* Cellules qui scrollent */}
      {cells.map(({ row, col }: any) => (
        <div
          key={`${row}-${col}`}
          className={styles.cellWrapper}
          style={{
            minWidth: COLUMN_WIDTH,
            width: COLUMN_WIDTH,
            height: ROW_HEIGHT,
            flexShrink: 0,
            borderRight: "1px solid #e8eaed",
            position: "relative",
          }}
          onClick={() => onCellClick(row, col)}
        >
          <Cell row={row} col={col} />
        </div>
      ))}
    </div>
  );
});

DataRow.displayName = "DataRow";

export const SpreadsheetGrid = ({ rows = 1000, cols = 26 }: GridProps) => {
  const [dimensions, setDimensions] = useState({ height: 600, width: 800 });
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { selectCell } = useStore();

  const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

  // Mettre à jour les dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth - 16;
      const height = window.innerHeight - 120;

      setDimensions({ height, width });

      // Calculer le scroll maximum
      const totalWidth = HEADER_WIDTH + cols * COLUMN_WIDTH;
      const maxScroll = Math.max(0, totalWidth - width + HEADER_WIDTH);
      setMaxScrollLeft(maxScroll);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [cols]);

  // Synchroniser le scroll horizontal avec limite
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      let newScrollLeft = target.scrollLeft;

      // Limiter le scroll à la colonne Z
      if (newScrollLeft > maxScrollLeft) {
        newScrollLeft = maxScrollLeft;
        target.scrollLeft = maxScrollLeft;
      }
      if (newScrollLeft < 0) {
        newScrollLeft = 0;
        target.scrollLeft = 0;
      }

      setScrollLeft(newScrollLeft);

      // Synchroniser les en-têtes
      if (headerRef.current) {
        headerRef.current.scrollLeft = newScrollLeft;
      }
    },
    [maxScrollLeft],
  );

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const cellId = `${getColumnLabel(col)}${row + 1}`;
      selectCell(cellId);
    },
    [selectCell],
  );

  // Générer les données pour Virtuoso
  const items = useMemo(() => {
    return Array.from({ length: rows }, (_, rowIndex) => ({
      rowIndex,
      cells: Array.from({ length: cols }, (_, colIndex) => ({
        row: rowIndex,
        col: colIndex,
      })),
    }));
  }, [rows, cols]);

  const itemContent = useCallback(
    (index: number, data: any) => {
      return (
        <DataRow
          rowIndex={data.rowIndex}
          cells={data.cells}
          onCellClick={handleCellClick}
          scrollLeft={scrollLeft}
        />
      );
    },
    [handleCellClick, scrollLeft],
  );

  const totalWidth = HEADER_WIDTH + cols * COLUMN_WIDTH;

  return (
    <div
      ref={containerRef}
      className={styles.gridContainer}
      style={{ height: dimensions.height }}
    >
      {/* En-têtes avec scroll horizontal */}
      <div
        ref={headerRef}
        className={styles.headerRow}
        style={{
          display: "flex",
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#f8f9fa",
          borderBottom: "2px solid #dadce0",
          minHeight: HEADER_HEIGHT,
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Coin fixe */}
        <div
          className={styles.corner}
          style={{
            minWidth: HEADER_WIDTH,
            width: HEADER_WIDTH,
            height: HEADER_HEIGHT,
            flexShrink: 0,
            background: "#f1f3f4",
            borderRight: "1px solid #dadce0",
            position: "sticky",
            left: 0,
            zIndex: 11,
          }}
        />

        {/* En-têtes de colonnes qui défilent */}
        <div
          style={{
            display: "flex",
            transform: `translateX(-${scrollLeft}px)`,
            transition: "transform 0.05s ease",
          }}
        >
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={`header-${i}`}
              className={styles.columnHeader}
              style={{
                minWidth: COLUMN_WIDTH,
                width: COLUMN_WIDTH,
                height: HEADER_HEIGHT,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8f9fa",
                borderRight: i < cols - 1 ? "1px solid #dadce0" : "none",
                fontWeight: 600,
                fontSize: "12px",
                color: "#5f6368",
                userSelect: "none",
              }}
            >
              {getColumnLabel(i)}
            </div>
          ))}
        </div>
      </div>

      {/* Corps avec virtualisation */}
      <div
        ref={bodyRef}
        className={styles.bodyWrapper}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflow: "auto",
          position: "relative",
        }}
      >
        <div style={{ width: totalWidth, position: "relative" }}>
          <VirtuosoGrid
            data={items}
            totalCount={rows}
            itemContent={itemContent}
            style={{
              height: dimensions.height - HEADER_HEIGHT,
              width: totalWidth,
            }}
            overscan={10}
            useWindowScroll={false}
          />
        </div>

        {/* Indicateur de fin de tableau */}
        <div
          className={styles.scrollEndIndicator}
          style={{
            position: "sticky",
            bottom: 0,
            right: 0,
            padding: "4px 8px",
            fontSize: "11px",
            color: "#9aa0a6",
            background: "rgba(255,255,255,0.9)",
            borderTop: "1px solid #e8eaed",
            textAlign: "right",
            pointerEvents: "none",
          }}
        >
          {cols} colonnes • {rows} lignes
        </div>
      </div>
    </div>
  );
};
