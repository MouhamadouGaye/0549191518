// // // "use client";

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
// // //         } as React.CSSProperties
// // //       }
// // //     >
// // //       {" "}
// // //       <div className={styles.pages} aria-hidden="true">
// // //         {Array.from({ length: pageCount }, (_, index) => (
// // //           <div key={index} className={styles.page} />
// // //         ))}{" "}
// // //       </div>
// // //       <div className={styles.editor}>
// // //         <EditorContent editor={editor} ref={onEditorElement} />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import type { CSSProperties } from "react";
// // import type { Editor } from "@tiptap/react";
// // import { EditorContent } from "@tiptap/react";

// // import styles from "./pagination-surface.module.css";

// // type PaginationSurfaceProps = {
// //   editor: Editor;
// //   pageCount: number;
// //   pageHeight: number;
// //   onEditorElement: (element: HTMLElement | null) => void;
// // };

// // export function PaginationSurface({
// //   editor,
// //   pageCount,
// //   pageHeight,
// //   onEditorElement,
// // }: PaginationSurfaceProps) {
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
// //       {" "}
// //       <div className={styles.pages} aria-hidden="true">
// //         {Array.from({ length: pageCount }, (_, index) => (
// //           <div
// //             key={`page-${index}`}
// //             className={styles.page}
// //             style={{
// //               top: `${index * pageHeight}px`,
// //             }}
// //           />
// //         ))}{" "}
// //       </div>
// //       <div className={styles.editor}>
// //         <EditorContent editor={editor} ref={onEditorElement} />
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import type { Editor } from "@tiptap/react";
// import type { CSSProperties } from "react";
// import { EditorContent } from "@tiptap/react";

// import styles from "./pagination-surface.module.css";
// import { PaginationResult } from "../pagination/pagination-types";

// type PaginationSurfaceProps = {
//   editor: Editor;
//   pagination: PaginationResult;
//   pageHeight: number;
//   onEditorElement: (element: HTMLDivElement | null) => void;
// };

// export function PaginationSurface({
//   editor,
//   pagination,
//   pageHeight,
//   onEditorElement,
// }: PaginationSurfaceProps) {
//   const pageCount = Math.max(1, pagination.pageCount);

//   const totalHeight = pageCount * pageHeight;

//   return (
//     <div
//       className={styles.surface}
//       style={
//         {
//           height: `${totalHeight}px`,
//           "--page-height": `${pageHeight}px`,
//         } as CSSProperties
//       }
//     >
//       <div className={styles.pages} aria-hidden="true">
//         {Array.from({ length: pageCount }, (_, index) => (
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

type PaginationSurfaceProps = {
  editor: Editor;
  pageCount: number;
  pageHeight: number;
  contentHeight: number;
  onEditorElement: (element: HTMLDivElement | null) => void;
};

export function PaginationSurface({
  editor,
  pageCount,
  pageHeight,
  contentHeight,
  onEditorElement,
}: PaginationSurfaceProps) {
  const pages = Math.max(1, pageCount);

  const totalHeight = pages * pageHeight;

  return (
    // <div
    //   style={{
    //     position: "relative",
    //     width: "794px",
    //     minHeight: "1123px",
    //     background: "red",
    //   }}
    // >
    //   TEST PAGINATION SURFACE

    <div>
      <div
        className={styles.surface}
        style={
          {
            "--page-height": `${pageHeight}px`,
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
                top: `${index * pageHeight}px`,
              }}
            />
          ))}
        </div>

        <div className={styles.editor}>
          <EditorContent editor={editor} ref={onEditorElement} />
        </div>
      </div>
    </div>
  );
}
