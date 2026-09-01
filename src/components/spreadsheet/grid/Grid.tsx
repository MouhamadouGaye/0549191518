// // // src/components/spreadsheet/grid/Grid.tsx

// // "use client";

// // import { useEffect, useState, useCallback, useRef } from "react";
// // import { VirtuosoGrid } from "react-virtuoso";
// // import { Cell } from "../cell/Cell";
// // import { useStore } from "@/src/store/spreadsheetstore";
// // import styles from "./Grid.module.css";

// // interface GridProps {
// //   rows?: number;
// //   cols?: number;
// // }

// // const COLUMN_WIDTH = 80;
// // const ROW_HEIGHT = 32;
// // const HEADER_HEIGHT = 32;
// // const HEADER_WIDTH = 40;

// // export const SpreadsheetGrid = ({ rows = 100000, cols = 26 }: GridProps) => {
// //   const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
// //   const { selectCell, selectedCell } = useStore();

// //   const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

// //   useEffect(() => {
// //     const updateDimensions = () => {
// //       setDimensions({
// //         height: window.innerHeight - 120,
// //         width: window.innerWidth - 16,
// //       });
// //     };

// //     updateDimensions();
// //     window.addEventListener("resize", updateDimensions);
// //     return () => window.removeEventListener("resize", updateDimensions);
// //   }, []);

// //   // Générer les données pour Virtuoso
// //   const items = Array.from({ length: rows }, (_, rowIndex) => ({
// //     rowIndex,
// //     cells: Array.from({ length: cols }, (_, colIndex) => ({
// //       row: rowIndex,
// //       col: colIndex,
// //     })),
// //   }));

// //   // Gérer le clic sur une cellule
// //   const handleCellClick = useCallback(
// //     (row: number, col: number) => {
// //       const cellId = `${getColumnLabel(col)}${row + 1}`;
// //       selectCell(cellId);
// //     },
// //     [selectCell],
// //   );

// //   // Composant de rendu pour chaque ligne
// //   const RowRenderer = useCallback(
// //     ({ data, index }: any) => {
// //       const { rowIndex, cells: rowCells } = data;

// //       return (
// //         <div
// //           className={styles.dataRow}
// //           style={{
// //             display: "flex",
// //             minHeight: ROW_HEIGHT,
// //             borderBottom: "1px solid #e8eaed",
// //           }}
// //         >
// //           {/* En-tête de ligne */}
// //           <div
// //             className={styles.rowHeader}
// //             style={{
// //               minWidth: HEADER_WIDTH,
// //               width: HEADER_WIDTH,
// //               height: ROW_HEIGHT,
// //               flexShrink: 0,
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               background: "#f8f9fa",
// //               borderRight: "1px solid #dadce0",
// //               fontSize: "12px",
// //               color: "#5f6368",
// //               userSelect: "none",
// //               position: "sticky",
// //               left: 0,
// //               zIndex: 5,
// //             }}
// //           >
// //             {rowIndex + 1}
// //           </div>

// //           {/* Cellules de la ligne */}
// //           {rowCells.map(({ row, col }: any) => (
// //             <div
// //               key={`${row}-${col}`}
// //               style={{
// //                 minWidth: COLUMN_WIDTH,
// //                 width: COLUMN_WIDTH,
// //                 height: ROW_HEIGHT,
// //                 flexShrink: 0,
// //                 borderRight: "1px solid #e8eaed",
// //                 position: "relative",
// //               }}
// //               onClick={() => handleCellClick(row, col)}
// //             >
// //               <Cell row={row} col={col} />
// //             </div>
// //           ))}
// //         </div>
// //       );
// //     },
// //     [handleCellClick],
// //   );

// //   if (dimensions.height === 0) {
// //     return <div className={styles.loading}>Chargement...</div>;
// //   }

// //   return (
// //     <div className={styles.gridContainer}>
// //       {/* En-têtes fixes */}
// //       <div
// //         className={styles.headerRow}
// //         style={{
// //           display: "flex",
// //           position: "sticky",
// //           top: 0,
// //           zIndex: 10,
// //           background: "#f8f9fa",
// //           borderBottom: "2px solid #dadce0",
// //           minHeight: HEADER_HEIGHT,
// //         }}
// //       >
// //         <div
// //           className={styles.corner}
// //           style={{
// //             minWidth: HEADER_WIDTH,
// //             width: HEADER_WIDTH,
// //             height: HEADER_HEIGHT,
// //             flexShrink: 0,
// //             background: "#f1f3f4",
// //             borderRight: "1px solid #dadce0",
// //             position: "sticky",
// //             left: 0,
// //             zIndex: 11,
// //           }}
// //         />
// //         {Array.from({ length: cols }).map((_, i) => (
// //           <div
// //             key={`header-${i}`}
// //             className={styles.columnHeader}
// //             style={{
// //               minWidth: COLUMN_WIDTH,
// //               width: COLUMN_WIDTH,
// //               height: HEADER_HEIGHT,
// //               flexShrink: 0,
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               background: "#f8f9fa",
// //               borderRight: "1px solid #dadce0",
// //               fontWeight: 600,
// //               fontSize: "12px",
// //               color: "#5f6368",
// //               userSelect: "none",
// //             }}
// //           >
// //             {getColumnLabel(i)}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Corps avec virtualisation */}
// //       <VirtuosoGrid
// //         data={items}
// //         totalCount={rows}
// //         itemContent={(index, data) => <RowRenderer data={data} index={index} />}
// //         style={{
// //           height: dimensions.height - HEADER_HEIGHT,
// //           width: "100%",
// //         }}
// //         overscan={200}
// //         useWindowScroll={false}
// //       />
// //     </div>
// //   );
// // };

// // src/components/spreadsheet/grid/Grid.tsx

// "use client";

// import { useEffect, useState, useCallback, useRef } from "react";
// import { VirtuosoGrid } from "react-virtuoso";
// import { Cell } from "../cell/Cell";
// import { useStore } from "@/src/store/spreadsheetstore";
// import styles from "./Grid.module.css";

// interface GridProps {
//   rows?: number;
//   cols?: number;
// }

// const COLUMN_WIDTH = 80;
// const ROW_HEIGHT = 32;
// const HEADER_HEIGHT = 32;
// const HEADER_WIDTH = 40;

// export const SpreadsheetGrid = ({ rows = 100000, cols = 26 }: GridProps) => {
//   const [dimensions, setDimensions] = useState({ height: 600, width: 800 });
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { selectCell, selectedCell } = useStore();

//   const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (containerRef.current) {
//         const rect = containerRef.current.getBoundingClientRect();
//         setDimensions({
//           height: window.innerHeight - 120,
//           width: window.innerWidth - 16,
//         });
//       } else {
//         // Fallback si le container n'est pas encore disponible
//         setDimensions({
//           height: window.innerHeight - 120,
//           width: window.innerWidth - 16,
//         });
//       }
//     };

//     // Mettre à jour immédiatement
//     updateDimensions();

//     // Ajouter un listener pour le resize
//     window.addEventListener("resize", updateDimensions);

//     // Nettoyer
//     return () => window.removeEventListener("resize", updateDimensions);
//   }, []);

//   // Générer les données pour Virtuoso
//   const items = Array.from({ length: rows }, (_, rowIndex) => ({
//     rowIndex,
//     cells: Array.from({ length: cols }, (_, colIndex) => ({
//       row: rowIndex,
//       col: colIndex,
//     })),
//   }));

//   // Gérer le clic sur une cellule
//   const handleCellClick = useCallback(
//     (row: number, col: number) => {
//       const cellId = `${getColumnLabel(col)}${row + 1}`;
//       selectCell(cellId);
//     },
//     [selectCell],
//   );

//   // Largeur totale du tableau
//   const totalWidth = HEADER_WIDTH + cols * COLUMN_WIDTH;

//   return (
//     <div
//       ref={containerRef}
//       className={styles.gridContainer}
//       style={{
//         height: dimensions.height,
//         width: "100%",
//       }}
//     >
//       {/* En-têtes fixes */}
//       <div
//         className={styles.headerRow}
//         style={{
//           display: "flex",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           background: "#f8f9fa",
//           borderBottom: "2px solid #dadce0",
//           minHeight: HEADER_HEIGHT,
//           overflow: "hidden",
//           width: "100%",
//         }}
//       >
//         <div
//           className={styles.corner}
//           style={{
//             minWidth: HEADER_WIDTH,
//             width: HEADER_WIDTH,
//             height: HEADER_HEIGHT,
//             flexShrink: 0,
//             background: "#f1f3f4",
//             borderRight: "1px solid #dadce0",
//             position: "sticky",
//             left: 0,
//             zIndex: 11,
//           }}
//         />
//         <div style={{ display: "flex", overflow: "hidden" }}>
//           {Array.from({ length: cols }).map((_, i) => (
//             <div
//               key={`header-${i}`}
//               className={styles.columnHeader}
//               style={{
//                 minWidth: COLUMN_WIDTH,
//                 width: COLUMN_WIDTH,
//                 height: HEADER_HEIGHT,
//                 flexShrink: 0,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 background: "#f8f9fa",
//                 borderRight: "1px solid #dadce0",
//                 fontWeight: 600,
//                 fontSize: "12px",
//                 color: "#5f6368",
//                 userSelect: "none",
//               }}
//             >
//               {getColumnLabel(i)}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Corps avec virtualisation */}
//       <div
//         className={styles.bodyWrapper}
//         style={{
//           flex: 1,
//           overflow: "auto",
//           position: "relative",
//           height: dimensions.height - HEADER_HEIGHT,
//         }}
//       >
//         <VirtuosoGrid
//           data={items}
//           totalCount={rows}
//           itemContent={(index, data) => (
//             <div
//               className={styles.dataRow}
//               style={{
//                 display: "flex",
//                 minHeight: ROW_HEIGHT,
//                 borderBottom: "1px solid #e8eaed",
//                 width: totalWidth,
//               }}
//             >
//               {/* En-tête de ligne sticky */}
//               <div
//                 className={styles.rowHeader}
//                 style={{
//                   minWidth: HEADER_WIDTH,
//                   width: HEADER_WIDTH,
//                   height: ROW_HEIGHT,
//                   flexShrink: 0,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   background: "#f8f9fa",
//                   borderRight: "1px solid #dadce0",
//                   fontSize: "12px",
//                   color: "#5f6368",
//                   userSelect: "none",
//                   position: "sticky",
//                   left: 0,
//                   zIndex: 5,
//                 }}
//               >
//                 {data.rowIndex + 1}
//               </div>

//               {/* Cellules de la ligne */}
//               {data.cells.map(({ row, col }: any) => (
//                 <div
//                   key={`${row}-${col}`}
//                   style={{
//                     minWidth: COLUMN_WIDTH,
//                     width: COLUMN_WIDTH,
//                     height: ROW_HEIGHT,
//                     flexShrink: 0,
//                     borderRight: "1px solid #e8eaed",
//                     position: "relative",
//                   }}
//                   onClick={() => handleCellClick(row, col)}
//                 >
//                   <Cell row={row} col={col} />
//                 </div>
//               ))}
//             </div>
//           )}
//           style={{
//             height: dimensions.height - HEADER_HEIGHT,
//             width: totalWidth,
//           }}
//           overscan={200}
//         />
//       </div>
//     </div>
//   );
// };
// src/components/spreadsheet/grid/Grid.tsx

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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

export const SpreadsheetGrid = ({ rows = 100000, cols = 26 }: GridProps) => {
  const [dimensions, setDimensions] = useState({ height: 600, width: 800 });
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { selectCell } = useStore();

  const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        height: window.innerHeight - 120,
        width: window.innerWidth - 16,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Synchroniser le scroll horizontal entre les en-têtes et le corps
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const newScrollLeft = target.scrollLeft;
    setScrollLeft(newScrollLeft);

    // Synchroniser les en-têtes
    if (headerRef.current) {
      headerRef.current.scrollLeft = newScrollLeft;
    }
  }, []);

  // Générer les données pour Virtuoso
  const items = Array.from({ length: rows }, (_, rowIndex) => ({
    rowIndex,
    cells: Array.from({ length: cols }, (_, colIndex) => ({
      row: rowIndex,
      col: colIndex,
    })),
  }));

  // Gérer le clic sur une cellule
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const cellId = `${getColumnLabel(col)}${row + 1}`;
      selectCell(cellId);
    },
    [selectCell],
  );

  // Largeur totale du tableau
  const totalWidth = HEADER_WIDTH + cols * COLUMN_WIDTH;

  if (dimensions.height === 0) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  return (
    <div
      ref={containerRef}
      className={styles.gridContainer}
      style={{
        height: dimensions.height,
        width: "100%",
      }}
    >
      {/* En-têtes fixes avec scroll horizontal synchronisé */}
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
        <div style={{ display: "flex", minWidth: "100%" }}>
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

          {/* En-têtes de colonnes avec scroll */}
          <div
            style={{
              display: "flex",
              overflow: "visible",
              transform: `translateX(-${scrollLeft}px)`,
              transition: "transform 0.1s ease",
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
                  borderRight: "1px solid #dadce0",
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
      </div>

      {/* Corps avec virtualisation et scroll */}
      <div
        ref={bodyRef}
        className={styles.bodyWrapper}
        style={{
          flex: 1,
          overflow: "auto",
          position: "relative",
        }}
        onScroll={handleScroll}
      >
        <div style={{ width: totalWidth, position: "relative" }}>
          <VirtuosoGrid
            data={items}
            totalCount={rows}
            itemContent={(index, data) => (
              <div
                className={styles.dataRow}
                style={{
                  display: "flex",
                  minHeight: ROW_HEIGHT,
                  borderBottom: "1px solid #e8eaed",
                  width: totalWidth,
                }}
              >
                {/* En-tête de ligne sticky */}
                <div
                  className={styles.rowHeader}
                  style={{
                    minWidth: HEADER_WIDTH,
                    width: HEADER_WIDTH,
                    height: ROW_HEIGHT,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f8f9fa",
                    borderRight: "1px solid #dadce0",
                    fontSize: "12px",
                    color: "#5f6368",
                    userSelect: "none",
                    position: "sticky",
                    left: 0,
                    zIndex: 5,
                  }}
                >
                  {data.rowIndex + 1}
                </div>

                {/* Cellules de la ligne */}
                {data.cells.map(({ row, col }: any) => (
                  <div
                    key={`${row}-${col}`}
                    style={{
                      minWidth: COLUMN_WIDTH,
                      width: COLUMN_WIDTH,
                      height: ROW_HEIGHT,
                      flexShrink: 0,
                      borderRight: "1px solid #e8eaed",
                      position: "relative",
                    }}
                    onClick={() => handleCellClick(row, col)}
                  >
                    <Cell row={row} col={col} />
                  </div>
                ))}
              </div>
            )}
            style={{
              height: dimensions.height - HEADER_HEIGHT,
              width: totalWidth,
            }}
            overscan={200}
          />
        </div>
      </div>
    </div>
  );
};
