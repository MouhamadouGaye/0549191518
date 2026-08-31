// // // // "use client";

// // // // import type { Editor } from "@tiptap/react";
// // // // import { EditorContent } from "@tiptap/react";

// // // // import styles from "./pagination-surface.module.css";

// // // // type PaginationSurfaceProps = {
// // // //   editor: Editor;
// // // //   pageCount: number;
// // // //   pageHeight: number;
// // // //   onEditorElement: (element: HTMLElement | null) => void;
// // // // };

// // // // export function PaginationSurface({
// // // //   editor,
// // // //   pageCount,
// // // //   pageHeight,
// // // //   onEditorElement,
// // // // }: PaginationSurfaceProps) {
// // // //   const totalHeight = pageCount * pageHeight;

// // // //   return (
// // // //     <div
// // // //       className={styles.surface}
// // // //       style={
// // // //         {
// // // //           height: `${totalHeight}px`,
// // // //           "--page-height": `${pageHeight}px`,
// // // //         } as React.CSSProperties
// // // //       }
// // // //     >
// // // //       {" "}
// // // //       <div className={styles.pages} aria-hidden="true">
// // // //         {Array.from({ length: pageCount }, (_, index) => (
// // // //           <div key={index} className={styles.page} />
// // // //         ))}{" "}
// // // //       </div>
// // // //       <div className={styles.editor}>
// // // //         <EditorContent editor={editor} ref={onEditorElement} />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import type { CSSProperties } from "react";
// // // import type { Editor } from "@tiptap/react";
// // // import { EditorContent } from "@tiptap/react";

// // // import styles from "./pagination-surface.module.css";

// // // type PaginationSurfaceProps = {
// // //   editor: Editor;
// // //   pageCount: number;
// // //   pageHeight: number;
// // //   onEditorElement: (element: HTMLElement | null) => void;
// // // };

// // // export function PaginationSurface({
// // //   editor,
// // //   pageCount,
// // //   pageHeight,
// // //   onEditorElement,
// // // }: PaginationSurfaceProps) {
// // //   const totalHeight = pageCount * pageHeight;

// // //   return (
// // //     <div
// // //       className={styles.surface}
// // //       style={
// // //         {
// // //           height: `${totalHeight}px`,
// // //           "--page-height": `${pageHeight}px`,
// // //         } as CSSProperties
// // //       }
// // //     >
// // //       {" "}
// // //       <div className={styles.pages} aria-hidden="true">
// // //         {Array.from({ length: pageCount }, (_, index) => (
// // //           <div
// // //             key={`page-${index}`}
// // //             className={styles.page}
// // //             style={{
// // //               top: `${index * pageHeight}px`,
// // //             }}
// // //           />
// // //         ))}{" "}
// // //       </div>
// // //       <div className={styles.editor}>
// // //         <EditorContent editor={editor} ref={onEditorElement} />
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import type { Editor } from "@tiptap/react";
// // import type { CSSProperties } from "react";
// // import { EditorContent } from "@tiptap/react";

// // import styles from "./pagination-surface.module.css";
// // import { PaginationResult } from "../pagination/pagination-types";

// // type PaginationSurfaceProps = {
// //   editor: Editor;
// //   pagination: PaginationResult;
// //   pageHeight: number;
// //   onEditorElement: (element: HTMLDivElement | null) => void;
// // };

// // export function PaginationSurface({
// //   editor,
// //   pagination,
// //   pageHeight,
// //   onEditorElement,
// // }: PaginationSurfaceProps) {
// //   const pageCount = Math.max(1, pagination.pageCount);

// //   const totalHeight = pageCount * pageHeight;

// //   return (
// //     <div
// //       className={styles.surface}
// //       style={
// //         {
// //           height: `${totalHeight}px`,
// //           "--page-height": `${pageHeight}px`,
// //         } as CSSProperties
// //       }
// //     >
// //       <div className={styles.pages} aria-hidden="true">
// //         {Array.from({ length: pageCount }, (_, index) => (
// //           <div
// //             key={index}
// //             className={styles.page}
// //             style={{
// //               top: `${index * pageHeight}px`,
// //             }}
// //           />
// //         ))}
// //       </div>

// //       <div className={styles.editor}>
// //         <EditorContent editor={editor} ref={onEditorElement} />
// //       </div>
// //     </div>
// //   );
// // }
// // "use client";

// // import type { Editor } from "@tiptap/react";
// // import { EditorContent } from "@tiptap/react";
// // import type { CSSProperties } from "react";

// // import styles from "./pagination-surface.module.css";
// // import { PAGE_CONTENT_GAP, PAGE_GAP } from "../pagination/page-dimensions";

// // type PaginationSurfaceProps = {
// //   editor: Editor;
// //   pageCount: number;
// //   pageHeight: number;
// //   onEditorElement: (element: HTMLDivElement | null) => void;
// // };

// // export function PaginationSurface({
// //   editor,
// //   pageCount,
// //   pageHeight,
// //   onEditorElement,
// // }: PaginationSurfaceProps) {
// //   const pages = Math.max(1, pageCount);

// //   const totalHeight = pages * pageHeight;

// //   return (

// //     <div>
// //       <div
// //         className={styles.surface}
// //         style={
// //           {
// //             "--page-height": `${pageHeight}px`,
// //             "--page-gap": `${PAGE_GAP}px`,
// //             "--page-content-gap": `${PAGE_CONTENT_GAP}px`,
// //             height: `${totalHeight}px`,
// //           } as CSSProperties
// //         }
// //       >
// //         <div className={styles.pages}>
// //           {Array.from({ length: pages }, (_, index) => (
// //             <div
// //               key={index}
// //               className={styles.page}
// //               style={{
// //                 top: `${index * pageHeight}px`,
// //               }}
// //             />
// //           ))}
// //         </div>

// //         <div className={styles.editor}>
// //           <EditorContent editor={editor} ref={onEditorElement} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import type { Editor } from "@tiptap/react";
// import { EditorContent } from "@tiptap/react";
// import type { CSSProperties } from "react";

// import styles from "./pagination-surface.module.css";

// import { PAGE_CONTENT_GAP, PAGE_GAP } from "../pagination/page-dimensions";

// type PaginationSurfaceProps = {
//   editor: Editor;
//   pageCount: number;
//   pageHeight: number;
//   onEditorElement: (element: HTMLDivElement | null) => void;
// };

// export function PaginationSurface({
//   editor,
//   pageCount,
//   pageHeight,
//   onEditorElement,
// }: PaginationSurfaceProps) {
//   const pages = Math.max(1, pageCount);

//   const totalHeight = pages * pageHeight;

//   return (
//     <div
//       className={styles.surface}
//       style={
//         {
//           "--page-height": `${pageHeight}px`,
//           "--page-gap": `${PAGE_GAP}px`,
//           "--page-content-gap": `${PAGE_CONTENT_GAP}px`,
//           height: `${totalHeight}px`,
//         } as CSSProperties
//       }
//     >
//       <div className={styles.pages}>
//         {Array.from({ length: pages }, (_, index) => (
//           <div
//             key={index}
//             className={styles.page}
//             style={{
//               top: `${index * pageHeight}px`,
//             }}
//           />
//         ))}
//       </div>

//       <div className={styles.editor}>
//         <EditorContent editor={editor} ref={onEditorElement} />
//       </div>
//     </div>
//   );
// }

"use client";

import type { Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import type { CSSProperties } from "react";

import styles from "./pagination-surface.module.css";

import {
  PAGE_SEPARATOR_HEIGHT,
  PAGE_SEPARATOR_SPACE,
} from "../pagination/page-dimensions";

type PaginationSurfaceProps = {
  editor: Editor;
  pageCount: number;
  pageHeight: number;
  onEditorElement: (element: HTMLDivElement | null) => void;
};

export function PaginationSurface({
  editor,
  pageCount,
  pageHeight,
  onEditorElement,
}: PaginationSurfaceProps) {
  const pages = Math.max(1, pageCount);

  /*
   * Entre deux feuilles :
   *
   * 20px espace avant la bande
   * 16px bande
   * 20px espace après la bande
   *
   * Total : 56px
   */
  const separatorTotal = PAGE_SEPARATOR_SPACE * 2 + PAGE_SEPARATOR_HEIGHT;

  /*
   * Distance entre le début d'une page
   * et le début de la suivante.
   */
  const pageDistance = pageHeight + separatorTotal;

  /*
   * Hauteur totale de la surface.
   *
   * Il n'y a pas de séparation après
   * la dernière page.
   */
  const totalHeight = pages * pageHeight + (pages - 1) * separatorTotal;

  return (
    <div
      className={styles.surface}
      style={
        {
          "--page-height": `${pageHeight}px`,
          "--page-distance": `${pageDistance}px`,
          "--page-separator-space": `${PAGE_SEPARATOR_SPACE}px`,
          "--page-separator-height": `${PAGE_SEPARATOR_HEIGHT}px`,
          height: `${totalHeight}px`,
        } as CSSProperties
      }
    >
      <div className={styles.pages}>
        {Array.from({ length: pages }, (_, index) => (
          <div
            key={index}
            className={styles.page}
            style={{
              top: `${index * pageDistance}px`,
            }}
          />
        ))}
      </div>

      <div className={styles.editor}>
        <EditorContent editor={editor} ref={onEditorElement} />
      </div>
    </div>
  );
}
