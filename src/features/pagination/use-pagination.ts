// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import type { Editor } from "@tiptap/react";

// // // import { PaginationEngine } from "./pagination-engine";
// // // import type { PaginationResult } from "./pagination-types";
// // // import { PAGE_CONTENT_HEIGHT } from "./page-dimensions";
// // // import { mmToPx } from "@/src/lib/utils/utils";

// // // export function usePagination(
// // //   editor: Editor | null,
// // //   element: HTMLElement | null,
// // // ) {
// // //   const [pagination, setPagination] = useState<PaginationResult | null>(null);

// // //   useEffect(() => {
// // //     if (!editor || !element) {
// // //       return;
// // //     }

// // //     const engine = new PaginationEngine();

// // //     const update = () => {
// // //       const pageHeight = mmToPx(PAGE_CONTENT_HEIGHT);

// // //       console.log({
// // //         height: element.scrollHeight,
// // //         clientHeight: element.clientHeight,
// // //         pageHeight,
// // //       });

// // //       const result = engine.paginate(element, pageHeight);

// // //       console.table(
// // //         result.blocks.map((block) => ({
// // //           index: block.index,
// // //           top: Math.round(block.top),
// // //           bottom: Math.round(block.bottom),
// // //           height: Math.round(block.height),
// // //           page: Math.floor(block.top / pageHeight),
// // //         })),
// // //       );

// // //       console.log("Pages:", result.pages);

// // //       console.log("Pagination element:", element);
// // //       console.log("tagName:", element.tagName);
// // //       console.log("className:", element.className);
// // //       console.log(
// // //         "children:",
// // //         Array.from(element.children).map((child) => ({
// // //           tag: child.tagName,
// // //           className: child.className,
// // //           height: (child as HTMLElement).getBoundingClientRect().height,
// // //         })),
// // //       );

// // //       //   console.log("Pagination:", result);

// // //       setPagination(result);
// // //     };

// // //     requestAnimationFrame(update);

// // //     editor.on("update", update);

// // //     const resizeObserver = new ResizeObserver(() => {
// // //       requestAnimationFrame(update);
// // //     });

// // //     resizeObserver.observe(element);

// // //     return () => {
// // //       editor.off("update", update);
// // //       resizeObserver.disconnect();
// // //     };
// // //   }, [editor, element]);

// // //   return pagination;
// // // }
// // "use client";

// // import { useEffect, useState } from "react";
// // import type { Editor } from "@tiptap/react";

// // import type { PaginationResult } from "./pagination-types";
// // import { PaginationEngine } from "./pagination-engine";
// // import { mmToPx } from "@/src/lib/utils/utils";
// // import { PAGE_CONTENT_HEIGHT } from "./page-dimensions";

// // export function usePagination(
// //   editor: Editor | null,
// //   element: HTMLElement | null,
// // ) {
// //   const [pagination, setPagination] = useState<PaginationResult | null>(null);

// //   useEffect(() => {
// //     if (!editor || !element) {
// //       return;
// //     }

// //     const proseMirror = element.querySelector<HTMLElement>(".ProseMirror");

// //     if (!proseMirror) {
// //       console.warn("Pagination: .ProseMirror introuvable");

// //       return;
// //     }

// //     const engine = new PaginationEngine();

// //     const update = () => {
// //       const pageHeight = mmToPx(PAGE_CONTENT_HEIGHT);

// //       console.log({
// //         height: proseMirror.scrollHeight,
// //         clientHeight: proseMirror.clientHeight,
// //         pageHeight,
// //       });

// //       const result = engine.paginate(proseMirror, pageHeight);

// //       console.table(
// //         result.blocks.map((block) => ({
// //           index: block.index,
// //           top: Math.round(block.top),
// //           bottom: Math.round(block.bottom),
// //           height: Math.round(block.height),
// //           page: Math.floor(block.top / pageHeight),
// //         })),
// //       );

// //       console.log("Pages:", result.pages);

// //       setPagination(result);
// //     };

// //     requestAnimationFrame(update);

// //     editor.on("update", update);

// //     const resizeObserver = new ResizeObserver(() => {
// //       requestAnimationFrame(update);
// //     });

// //     resizeObserver.observe(proseMirror);

// //     return () => {
// //       editor.off("update", update);
// //       resizeObserver.disconnect();
// //     };
// //   }, [editor, element]);

// //   return pagination;
// // }
// // "use client";

// // import { useEffect, useState } from "react";
// // import type { Editor } from "@tiptap/react";

// // import type { PaginationResult } from "./pagination-types";
// // import { PaginationEngine } from "./pagination-engine";
// // import { PAGE_CONTENT_HEIGHT, PAGE_CONTENT_GAP } from "./page-dimensions";
// // import { mmToPx } from "@/src/lib/utils/utils";

// // export function usePagination(
// //   editor: Editor | null,
// //   element: HTMLElement | null,
// // ) {
// //   const [pagination, setPagination] = useState<PaginationResult | null>(null);

// //   useEffect(() => {
// //     if (!editor || !element) {
// //       return;
// //     }

// //     const proseMirror = element.querySelector<HTMLElement>(".ProseMirror");

// //     if (!proseMirror) {
// //       console.warn("Pagination: .ProseMirror introuvable");

// //       return;
// //     }

// //     const engine = new PaginationEngine();

// //     const update = () => {
// //       /*
// //        * Hauteur disponible à l'intérieur d'une feuille,
// //        * entre la marge haute et la marge basse.
// //        */
// //       const pageHeight = mmToPx(PAGE_CONTENT_HEIGHT);

// //       /*
// //        * On réserve 20px avant la séparation.
// //        *
// //        * Le texte ne doit donc jamais atteindre
// //        * les derniers pixels de la zone de contenu.
// //        */
// //       const usablePageHeight = pageHeight - PAGE_CONTENT_GAP;

// //       const result = engine.paginate(proseMirror, usablePageHeight);

// //       console.table(
// //         result.blocks.map((block) => ({
// //           index: block.index,
// //           top: Math.round(block.top),
// //           bottom: Math.round(block.bottom),
// //           height: Math.round(block.height),
// //           page: Math.floor(block.top / usablePageHeight),
// //         })),
// //       );

// //       console.log("Page content height:", pageHeight);

// //       console.log("Usable page height:", usablePageHeight);

// //       console.log("Pages:", result.pages);

// //       console.log({
// //         pageHeight,
// //         pageCount: result.pageCount,
// //         pages: result.pages,
// //       });

// //       setPagination(result);
// //     };

// //     requestAnimationFrame(update);

// //     editor.on("update", update);

// //     const resizeObserver = new ResizeObserver(() => {
// //       requestAnimationFrame(update);
// //     });

// //     resizeObserver.observe(proseMirror);

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

// import type { PaginationResult } from "./pagination-types";
// import { PaginationEngine } from "./pagination-engine";
// import { PAGE_CONTENT_HEIGHT, PAGE_SEPARATOR_SPACE } from "./page-dimensions";
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

//     const proseMirror = element.querySelector<HTMLElement>(".ProseMirror");

//     if (!proseMirror) {
//       console.warn("Pagination: .ProseMirror introuvable");

//       return;
//     }

//     const engine = new PaginationEngine();

//     const update = () => {
//       /*
//        * Hauteur réellement disponible pour le contenu
//        * d'une page, entre les marges A4.
//        */
//       const pageHeight = mmToPx(PAGE_CONTENT_HEIGHT);

//       /*
//        * Espace de sécurité avant la bande.
//        *
//        * Le dernier contenu d'une page doit s'arrêter
//        * au moins 20px avant la séparation.
//        */
//       const separatorSpace = PAGE_SEPARATOR_SPACE;

//       const usablePageHeight = pageHeight - separatorSpace;

//       const result = engine.paginate(proseMirror, usablePageHeight);

//       console.table(
//         result.blocks.map((block) => ({
//           index: block.index,
//           top: Math.round(block.top),
//           bottom: Math.round(block.bottom),
//           height: Math.round(block.height),
//           page: Math.floor(block.top / usablePageHeight),
//         })),
//       );

//       console.log({
//         pageHeight,
//         separatorSpace,
//         usablePageHeight,
//         pageCount: result.pageCount,
//       });

//       console.log("Pages:", result.pages);

//       setPagination(result);
//     };

//     requestAnimationFrame(update);

//     editor.on("update", update);

//     const resizeObserver = new ResizeObserver(() => {
//       requestAnimationFrame(update);
//     });

//     resizeObserver.observe(proseMirror);

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

import {
  PAGE_CONTENT_HEIGHT,
  PAGE_SEPARATOR_HEIGHT,
  PAGE_SEPARATOR_SPACE,
} from "./page-dimensions";

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

    const proseMirror = element.querySelector<HTMLElement>(".ProseMirror");

    if (!proseMirror) {
      console.warn("Pagination: .ProseMirror introuvable");

      return;
    }

    const engine = new PaginationEngine();

    const update = () => {
      const pageHeight = mmToPx(PAGE_CONTENT_HEIGHT);

      /*
       * Espace entre deux feuilles :
       *
       * 20px
       * 16px bande
       * 20px
       */
      const separatorTotal = PAGE_SEPARATOR_SPACE * 2 + PAGE_SEPARATOR_HEIGHT;

      /*
       * Distance entre le haut
       * de deux feuilles.
       */
      const pageDistance = pageHeight + separatorTotal;

      const result = engine.paginate(proseMirror, pageHeight);

      /*
       * IMPORTANT :
       *
       * On conserve un seul ProseMirror.
       * On déplace simplement les blocs
       * vers leur page visuelle.
       */
      engine.applyPageLayout(proseMirror, result, pageDistance);

      console.log({
        pageHeight,
        pageDistance,
        pageCount: result.pageCount,
        pages: result.pages,
      });

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

      /*
       * Nettoyage des transforms.
       */
      Array.from(proseMirror.children).forEach((child) => {
        (child as HTMLElement).style.transform = "";
      });
    };
  }, [editor, element]);

  return pagination;
}
