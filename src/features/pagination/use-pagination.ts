// "use client";

// import { useEffect, useState } from "react";
// import type { Editor } from "@tiptap/react";

// import { PaginationEngine } from "./pagination-engine";
// import type { PaginationResult } from "./pagination-types";
// import { PAGE_CONTENT_HEIGHT } from "./page-dimensions";
// import { mmToPx } from "@/src/lib/utils/utils";

// export function usePagination(
//   editor: Editor | null,
//   element: HTMLElement | null,
// ) {
//   const [pagination, setPagination] = useState<PaginationResult | null>(null);

//   useEffect(() => {
//     if (!editor || !element) {
//       return;
//     }

//     const engine = new PaginationEngine();

//     const update = () => {
//       const pageHeight = mmToPx(PAGE_CONTENT_HEIGHT);

//       console.log({
//         height: element.scrollHeight,
//         clientHeight: element.clientHeight,
//         pageHeight,
//       });

//       const result = engine.paginate(element, pageHeight);

//       console.table(
//         result.blocks.map((block) => ({
//           index: block.index,
//           top: Math.round(block.top),
//           bottom: Math.round(block.bottom),
//           height: Math.round(block.height),
//           page: Math.floor(block.top / pageHeight),
//         })),
//       );

//       console.log("Pages:", result.pages);

//       console.log("Pagination element:", element);
//       console.log("tagName:", element.tagName);
//       console.log("className:", element.className);
//       console.log(
//         "children:",
//         Array.from(element.children).map((child) => ({
//           tag: child.tagName,
//           className: child.className,
//           height: (child as HTMLElement).getBoundingClientRect().height,
//         })),
//       );

//       //   console.log("Pagination:", result);

//       setPagination(result);
//     };

//     requestAnimationFrame(update);

//     editor.on("update", update);

//     const resizeObserver = new ResizeObserver(() => {
//       requestAnimationFrame(update);
//     });

//     resizeObserver.observe(element);

//     return () => {
//       editor.off("update", update);
//       resizeObserver.disconnect();
//     };
//   }, [editor, element]);

//   return pagination;
// }
"use client";

import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";

import type { PaginationResult } from "./pagination-types";
import { PaginationEngine } from "./pagination-engine";
import { mmToPx } from "@/src/lib/utils/utils";
import { PAGE_CONTENT_HEIGHT } from "./page-dimensions";

export function usePagination(
  editor: Editor | null,
  element: HTMLElement | null,
) {
  const [pagination, setPagination] = useState<PaginationResult | null>(null);

  useEffect(() => {
    if (!editor || !element) {
      return;
    }

    const proseMirror = element.querySelector<HTMLElement>(".ProseMirror");

    if (!proseMirror) {
      console.warn("Pagination: .ProseMirror introuvable");

      return;
    }

    const engine = new PaginationEngine();

    const update = () => {
      const pageHeight = mmToPx(PAGE_CONTENT_HEIGHT);

      console.log({
        height: proseMirror.scrollHeight,
        clientHeight: proseMirror.clientHeight,
        pageHeight,
      });

      const result = engine.paginate(proseMirror, pageHeight);

      console.table(
        result.blocks.map((block) => ({
          index: block.index,
          top: Math.round(block.top),
          bottom: Math.round(block.bottom),
          height: Math.round(block.height),
          page: Math.floor(block.top / pageHeight),
        })),
      );

      console.log("Pages:", result.pages);

      setPagination(result);
    };

    requestAnimationFrame(update);

    editor.on("update", update);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(update);
    });

    resizeObserver.observe(proseMirror);

    return () => {
      editor.off("update", update);
      resizeObserver.disconnect();
    };
  }, [editor, element]);

  return pagination;
}
