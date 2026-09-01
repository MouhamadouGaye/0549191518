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

const DEFAULT_COLUMN_WIDTH = 80;
const DEFAULT_ROW_HEIGHT = 32;
const HEADER_HEIGHT = 32;
const HEADER_WIDTH = 40;

// Composant de ligne mémoisé
const DataRow = memo(
  ({
    rowIndex,
    cells,
    onCellClick,
    onCellMouseDown,
    onCellMouseEnter,
    scrollLeft,
    selectedRange,
    getRangeCells,
    isDragging,
    columnWidths,
    rowHeights,
    onRowResizeStart,
  }: any) => {
    const isInRange = (cellId: string) => {
      if (!selectedRange) return false;
      const rangeCells = getRangeCells(selectedRange.start, selectedRange.end);
      return rangeCells.includes(cellId);
    };

    const rowHeight = rowHeights[rowIndex] || DEFAULT_ROW_HEIGHT;

    // Calculer la largeur totale de la ligne
    const totalWidth = cells.reduce((acc: number, cell: any, index: number) => {
      const colLetter = String.fromCharCode(65 + cell.col);
      return acc + (columnWidths[colLetter] || DEFAULT_COLUMN_WIDTH);
    }, HEADER_WIDTH);

    return (
      <div
        className={styles.dataRow}
        style={{
          transform: `translateX(-${scrollLeft}px)`,
          transition: "transform 0.05s ease",
          width: totalWidth,
          height: rowHeight,
          minHeight: rowHeight,
          position: "relative",
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
            height: rowHeight,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid #dadce0",
            fontSize: "12px",
            color: "#5f6368",
            userSelect: "none",
            // position: "relative",
          }}
        >
          {rowIndex + 1}
          {/* Séparateur de ligne (pour redimensionnement) */}
          <div
            className={styles.rowResizer}
            onMouseDown={(e) => onRowResizeStart(rowIndex, e)}
            style={{
              position: "absolute",
              bottom: -4,
              left: 0,
              width: "100%",
              height: 8,
              cursor: "row-resize",
              zIndex: 20,
            }}
          >
            <div
              className={styles.resizerHandleRow}
              style={{
                position: "absolute",
                bottom: 2,
                left: "25%",
                width: "50%",
                height: 2,
                background: "transparent",
                borderRadius: 1,
                transition: "background 0.15s",
              }}
            />
          </div>
        </div>

        {/* Cellules qui scrollent */}
        {cells.map(({ row, col }: any) => {
          const colLetter = String.fromCharCode(65 + col);
          const cellId = `${colLetter}${row + 1}`;
          const inRange = isInRange(cellId);
          const width = columnWidths[colLetter] || DEFAULT_COLUMN_WIDTH;

          return (
            <div
              key={`${row}-${col}`}
              className={`${styles.cellWrapper} ${inRange ? styles.inRange : ""}`}
              style={{
                minWidth: width,
                width: width,
                height: rowHeight,
                flexShrink: 0,
                borderRight:
                  col < cells.length - 1 ? "1px solid #e8eaed" : "none",
                position: "relative",
                backgroundColor: inRange
                  ? "rgba(52, 168, 83, 0.12)"
                  : "transparent",
                cursor: isDragging ? "crosshair" : "cell",
              }}
              onClick={(e) => onCellClick(row, col, e)}
              onMouseDown={(e) => onCellMouseDown(row, col, e)}
              onMouseEnter={() => onCellMouseEnter(row, col)}
              data-cell-id={cellId}
            >
              <Cell row={row} col={col} />
            </div>
          );
        })}
      </div>
    );
  },
);

DataRow.displayName = "DataRow";

export const SpreadsheetGrid = ({ rows = 1000, cols = 26 }: GridProps) => {
  const [dimensions, setDimensions] = useState({ height: 600, width: 800 });
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartCell, setDragStartCell] = useState<string | null>(null);
  const [isResizingCol, setIsResizingCol] = useState(false);
  const [isResizingRow, setIsResizingRow] = useState(false);
  const [resizeCol, setResizeCol] = useState<string | null>(null);
  const [resizeRow, setResizeRow] = useState<number | null>(null);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartY, setResizeStartY] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  const [resizeStartHeight, setResizeStartHeight] = useState(0);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [rowHeights, setRowHeights] = useState<Record<number, number>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const {
    selectCell,
    selectedRange,
    selectRange,
    getRangeCells,
    selectedCell,
  } = useStore();

  const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

  // Mettre à jour les dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth - 16;
      const height = window.innerHeight - 120;
      setDimensions({ height, width });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Initialiser les largeurs des colonnes
  useEffect(() => {
    const widths: Record<string, number> = {};
    for (let i = 0; i < cols; i++) {
      widths[getColumnLabel(i)] = DEFAULT_COLUMN_WIDTH;
    }
    setColumnWidths(widths);
  }, [cols]);

  // Gestion du drag et du resize
  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setDragStartCell(null);
      }
      if (isResizingCol) {
        setIsResizingCol(false);
        setResizeCol(null);
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
      }
      if (isResizingRow) {
        setIsResizingRow(false);
        setResizeRow(null);
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Redimensionnement des colonnes
      if (isResizingCol && resizeCol) {
        const deltaX = e.clientX - resizeStartX;
        const newWidth = Math.max(40, resizeStartWidth + deltaX);
        setColumnWidths((prev) => ({
          ...prev,
          [resizeCol]: newWidth,
        }));
      }

      // Redimensionnement des lignes
      if (isResizingRow && resizeRow !== null) {
        const deltaY = e.clientY - resizeStartY;
        const newHeight = Math.max(24, resizeStartHeight + deltaY);
        setRowHeights((prev) => ({
          ...prev,
          [resizeRow]: newHeight,
        }));
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    isDragging,
    isResizingCol,
    isResizingRow,
    resizeCol,
    resizeRow,
    resizeStartX,
    resizeStartY,
    resizeStartWidth,
    resizeStartHeight,
  ]);

  // Synchroniser le scroll horizontal
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const newScrollLeft = target.scrollLeft;
    setScrollLeft(newScrollLeft);

    if (headerRef.current) {
      headerRef.current.scrollLeft = newScrollLeft;
    }
  }, []);

  // Gestion du clic
  const handleCellClick = useCallback(
    (row: number, col: number, e: React.MouseEvent) => {
      const cellId = `${getColumnLabel(col)}${row + 1}`;
      if (isDragging) return;
      if (e.shiftKey && selectedCell) {
        selectRange(selectedCell, cellId);
      } else {
        selectCell(cellId);
      }
    },
    [selectCell, selectedCell, selectRange, isDragging],
  );

  // Gestion du MouseDown (début du drag)
  const handleCellMouseDown = useCallback(
    (row: number, col: number, e: React.MouseEvent) => {
      const cellId = `${getColumnLabel(col)}${row + 1}`;
      if (e.button === 0) {
        setDragStartCell(cellId);
        setIsDragging(true);
        selectCell(cellId);
        selectRange(cellId, cellId);
      }
    },
    [selectCell, selectRange],
  );

  // Gestion du MouseEnter (pendant le drag)
  const handleCellMouseEnter = useCallback(
    (row: number, col: number) => {
      if (!isDragging || !dragStartCell) return;
      const cellId = `${getColumnLabel(col)}${row + 1}`;
      selectRange(dragStartCell, cellId);
    },
    [isDragging, dragStartCell, selectRange],
  );

  // === REDIMENSIONNEMENT DES COLONNES ===
  const startColResize = useCallback(
    (col: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const currentWidth = columnWidths[col] || DEFAULT_COLUMN_WIDTH;
      setIsResizingCol(true);
      setResizeCol(col);
      setResizeStartX(e.clientX);
      setResizeStartWidth(currentWidth);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [columnWidths],
  );

  // === REDIMENSIONNEMENT DES LIGNES ===
  const startRowResize = useCallback(
    (row: number, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const currentHeight = rowHeights[row] || DEFAULT_ROW_HEIGHT;
      setIsResizingRow(true);
      setResizeRow(row);
      setResizeStartY(e.clientY);
      setResizeStartHeight(currentHeight);
      document.body.style.cursor = "row-resize";
      document.body.style.userSelect = "none";
    },
    [rowHeights],
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
          onCellMouseDown={handleCellMouseDown}
          onCellMouseEnter={handleCellMouseEnter}
          scrollLeft={scrollLeft}
          selectedRange={selectedRange}
          getRangeCells={getRangeCells}
          isDragging={isDragging}
          columnWidths={columnWidths}
          rowHeights={rowHeights}
          onRowResizeStart={startRowResize}
        />
      );
    },
    [
      handleCellClick,
      handleCellMouseDown,
      handleCellMouseEnter,
      scrollLeft,
      selectedRange,
      getRangeCells,
      isDragging,
      columnWidths,
      rowHeights,
      startRowResize,
    ],
  );

  // Calculer la largeur totale
  const totalWidth = Object.values(columnWidths).reduce(
    (acc, w) => acc + w,
    HEADER_WIDTH,
  );

  return (
    <div
      ref={containerRef}
      className={styles.gridContainer}
      style={{ height: dimensions.height }}
      onMouseLeave={() => {
        if (isDragging) {
          setIsDragging(false);
          setDragStartCell(null);
        }
      }}
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
            width: Object.values(columnWidths).reduce((acc, w) => acc + w, 0),
          }}
        >
          {Array.from({ length: cols }).map((_, i) => {
            const colLetter = getColumnLabel(i);
            const width = columnWidths[colLetter] || DEFAULT_COLUMN_WIDTH;

            return (
              <div
                key={`header-${i}`}
                className={styles.columnHeaderWrapper}
                style={{
                  position: "relative",
                  minWidth: width,
                  width: width,
                  height: HEADER_HEIGHT,
                  flexShrink: 0,
                }}
              >
                <div
                  className={styles.columnHeader}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f8f9fa",
                    borderRight: i < cols - 1 ? "1px solid #dadce0" : "none",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "#5f6368",
                    userSelect: "none",
                    height: "100%",
                    width: "100%",
                    paddingRight: i < cols - 1 ? "4px" : "0",
                  }}
                >
                  {colLetter}
                </div>

                {/* Séparateur de colonne (pour redimensionnement) */}
                {i < cols - 1 && (
                  <div
                    className={styles.columnResizer}
                    onMouseDown={(e) => startColResize(colLetter, e)}
                    style={{
                      position: "absolute",
                      right: -4,
                      top: 0,
                      width: 8,
                      height: "100%",
                      cursor: "col-resize",
                      zIndex: 20,
                    }}
                  >
                    <div
                      className={styles.resizerHandleCol}
                      style={{
                        position: "absolute",
                        right: 2,
                        top: "25%",
                        width: 2,
                        height: "50%",
                        background: "transparent",
                        borderRadius: 1,
                        transition: "background 0.15s",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Indicateur de sélection */}
        {isDragging && (
          <div
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "11px",
              color: "#34a853",
              background: "rgba(52, 168, 83, 0.1)",
              padding: "2px 10px",
              borderRadius: "12px",
              fontWeight: 500,
              zIndex: 20,
              animation: "pulse 1s ease-in-out infinite",
            }}
          >
            🔲 Sélection en cours...
          </div>
        )}
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
          cursor: isDragging ? "crosshair" : "default",
        }}
      >
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

        {/* Indicateur de fin de tableau */}
        <div
          className={styles.scrollEndIndicator}
          style={{
            position: "sticky",
            bottom: 0,
            right: 0,
            padding: "4px 12px",
            fontSize: "11px",
            color: "#9aa0a6",
            background: "rgba(255,255,255,0.95)",
            borderTop: "1px solid #e8eaed",
            textAlign: "right",
            pointerEvents: "none",
            backdropFilter: "blur(4px)",
            zIndex: 2,
          }}
        >
          {cols} colonnes • {rows} lignes
          {selectedRange && (
            <span style={{ marginLeft: 12, color: "#34a853" }}>
              • Plage: {selectedRange.start}:{selectedRange.end}
            </span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        .columnResizer:hover .resizerHandleCol {
          background: #1a73e8 !important;
          width: 3px !important;
        }
        
        .columnResizer:active .resizerHandleCol {
          background: #1a73e8 !important;
          height: 70% !important;
          width: 3px !important;
        }
        
        .rowResizer:hover .resizerHandleRow {
          background: #1a73e8 !important;
          height: 3px !important;
        }
        
        .rowResizer:active .resizerHandleRow {
          background: #1a73e8 !important;
          width: 70% !important;
          height: 3px !important;
        }
      `}</style>
    </div>
  );
};
