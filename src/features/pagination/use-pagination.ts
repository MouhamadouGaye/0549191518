// // "use client";

// // import { useEffect } from "react";

// // import type { Editor } from "@tiptap/react";

// // import { PaginationEngine } from "./pagination-engine";

// // export function usePagination(editor: Editor | null) {
// //   useEffect(() => {
// //     if (!editor) {
// //       return;
// //     }

// //     const engine = new PaginationEngine();

// //     const measure = () => {
// //       const element = document.querySelector(".ProseMirror");

// //       if (!(element instanceof HTMLElement)) {
// //         return;
// //       }

// //       const styles = window.getComputedStyle(element);

// //       const lineHeight = Number.parseFloat(styles.lineHeight);

// //       const availableHeight = element.clientHeight || lineHeight;

// //       const result = engine.measure(element, availableHeight);

// //       if (result.hasOverflow) {
// //         console.log("PAGE OVERFLOW", result);
// //       }
// //     };

// //     measure();

// //     editor.on("update", measure);

// //     return () => {
// //       editor.off("update", measure);
// //     };
// //   }, [editor]);
// // }
// "use client";

// import { useEffect } from "react";

// import type { Editor } from "@tiptap/react";

// import { PaginationEngine } from "./pagination-engine";

// export function usePagination(
//   editor: Editor | null,
//   editorElement: HTMLElement | null,
// ) {
//   useEffect(() => {
//     if (!editor || !editorElement) {
//       return;
//     }

//     const engine = new PaginationEngine();

//     const measure = () => {
//       const availableHeight = editorElement.clientHeight;

//       const result = engine.measure(editorElement, availableHeight);

//       const blocks = engine.measureBlocks(editorElement);

//       console.log("PAGINATION", {
//         result,
//         blocks,
//       });
//     };

//     measure();

//     editor.on("update", measure);

//     return () => {
//       editor.off("update", measure);
//     };
//   }, [editor, editorElement]);
// }
"use client";

import { useEffect } from "react";

import type { Editor } from "@tiptap/react";

import { PaginationEngine } from "./pagination-engine";
import { PAGE_CONTENT_HEIGHT } from "./page-dimensions";
import { mmToPx } from "@/src/lib/utils/utils";

export function usePagination(
  editor: Editor | null,
  editorElement: HTMLElement | null,
) {
  useEffect(() => {
    if (!editor || !editorElement) {
      return;
    }

    const engine = new PaginationEngine();

    const pageHeight = mmToPx(PAGE_CONTENT_HEIGHT);

    const measure = () => {
      const result = engine.paginate(editorElement, pageHeight);

      console.log("PAGINATION RESULT", result);
    };

    measure();

    editor.on("update", measure);

    return () => {
      editor.off("update", measure);
    };
  }, [editor, editorElement]);
}
