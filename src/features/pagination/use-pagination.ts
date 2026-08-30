// // // // "use client";

// // // // import { useEffect } from "react";

// // // // import type { Editor } from "@tiptap/react";

// // // // import { PaginationEngine } from "./pagination-engine";
// // // // import { PAGE_CONTENT_HEIGHT } from "./page-dimensions";
// // // // import { mmToPx } from "@/src/lib/utils/utils";

// // // // export function usePagination(
// // // //   editor: Editor | null,
// // // //   editorElement: HTMLElement | null,
// // // // ) {
// // // //   useEffect(() => {
// // // //     if (!editor || !editorElement) {
// // // //       return;
// // // //     }

// // // //     const engine = new PaginationEngine();

// // // //     const pageHeight = mmToPx(PAGE_CONTENT_HEIGHT);

// // // //     const measure = () => {
// // // //       const result = engine.paginate(editorElement, pageHeight);

// // // //       console.log("PAGINATION RESULT", result);
// // // //     };

// // // //     measure();

// // // //     editor.on("update", measure);

// // // //     return () => {
// // // //       editor.off("update", measure);
// // // //     };
// // // //   }, [editor, editorElement]);
// // // // }
// // // "use client";

// // // import { useEffect, useState } from "react";

// // // import type { Editor } from "@tiptap/react";

// // // import { PaginationEngine } from "./pagination-engine";
// // // import { PAGE_CONTENT_HEIGHT } from "./page-dimensions";
// // // import type { PaginationResult } from "./pagination-types";
// // // import { mmToPx } from "@/src/lib/utils/utils";

// // // export function usePagination(
// // //   editor: Editor | null,
// // //   editorElement: HTMLElement | null,
// // // ) {
// // //   const [pagination, setPagination] = useState<PaginationResult | null>(null);

// // //   useEffect(() => {
// // //     if (!editor || !editorElement) {
// // //       return;
// // //     }

// // //     const engine = new PaginationEngine();

// // //     const pageHeight = mmToPx(PAGE_CONTENT_HEIGHT);

// // //     const measure = () => {
// // //       const result = engine.paginate(editorElement, pageHeight);

// // //       setPagination(result);
// // //     };

// // //     measure();

// // //     editor.on("update", measure);

// // //     return () => {
// // //       editor.off("update", measure);
// // //     };
// // //   }, [editor, editorElement]);

// // //   return pagination;
// // // }

// // "use client";

// // import { useEffect, useState } from "react";
// // import type { Editor } from "@tiptap/react";

// // import { PaginationEngine } from "./pagination-engine";
// // import type { PaginationResult } from "./pagination-types";

// // export function usePagination(
// //   editor: Editor | null,
// //   element: HTMLElement | null,
// // ) {
// //   const [pagination, setPagination] = useState<PaginationResult | null>(null);

// //   useEffect(() => {
// //     if (!editor || !element) {
// //       return;
// //     }

// //     const engine = new PaginationEngine();

// //     const update = () => {
// //       const pageHeight = parseFloat(
// //         getComputedStyle(element).getPropertyValue("--page-content-height"),
// //       );

// //       if (!Number.isFinite(pageHeight)) {
// //         return;
// //       }

// //       setPagination(engine.paginate(element, pageHeight));
// //     };

// //     update();

// //     editor.on("update", update);

// //     const resizeObserver = new ResizeObserver(update);

// //     resizeObserver.observe(element);

// //     return () => {
// //       editor.off("update", update);
// //       resizeObserver.disconnect();
// //     };
// //   }, [editor, element]);

// //   return pagination;
// // }
// "use client";

// import { useEffect, useState } from "react";
// import type { Editor } from "@tiptap/react";

// import { PaginationEngine } from "./pagination-engine";
// import type { PaginationResult } from "./pagination-types";
// import { PAGE_CONTENT_HEIGHT } from "./page-dimensions";
// import { mmToPx } from "@/src/lib/utils/utils";

// // import {
// // PAGE_CONTENT_HEIGHT,
// // } from "@/src/config/page-config";

// // import { mmToPx } from "@/src/lib/mm-to-px";

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

//       const result = engine.paginate(element, pageHeight);

//       setPagination(result);
//     };

//     // Important :
//     // le contenu initial doit être mesuré
//     // dès que le DOM est prêt.
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

import { PaginationEngine } from "./pagination-engine";
import type { PaginationResult } from "./pagination-types";
import { PAGE_CONTENT_HEIGHT } from "./page-dimensions";
import { mmToPx } from "@/src/lib/utils/utils";

export function usePagination(
  editor: Editor | null,
  element: HTMLElement | null,
) {
  const [pagination, setPagination] = useState<PaginationResult | null>(null);

  useEffect(() => {
    if (!editor || !element) {
      return;
    }

    const engine = new PaginationEngine();

    const update = () => {
      const pageHeight = mmToPx(PAGE_CONTENT_HEIGHT);

      const result = engine.paginate(element, pageHeight);

      setPagination(result);
    };

    // Important :
    // le contenu initial doit être mesuré
    // dès que le DOM est prêt.
    requestAnimationFrame(update);

    editor.on("update", update);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(update);
    });

    resizeObserver.observe(element);

    return () => {
      editor.off("update", update);
      resizeObserver.disconnect();
    };
  }, [editor, element]);

  return pagination;
}
