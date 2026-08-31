// import {
//   PaginationBlock,
//   PaginationPage,
//   PaginationResult,
// } from "./pagination-types";

// // export class PaginationEngine {
// //   measureBlocks(element: HTMLElement): PaginationBlock[] {
// //     const containerTop = element.getBoundingClientRect().top;

// //     return Array.from(element.children).map((block, index) => {
// //       const rect = block.getBoundingClientRect();

// //       return {
// //         index,
// //         top: rect.top - containerTop,

// //         bottom: rect.bottom - containerTop,

// //         height: rect.height,
// //       };
// //     });
// //   }

// //   paginate(element: HTMLElement, pageHeight: number): PaginationResult {
// //     const blocks = this.measureBlocks(element);

// //     if (blocks.length === 0) {
// //       return {
// //         blocks,

// //         pages: [
// //           {
// //             index: 0,
// //             startBlock: 0,
// //             endBlock: -1,
// //             top: 0,
// //             bottom: pageHeight,
// //           },
// //         ],

// //         pageCount: 1,
// //       };
// //     }

// //     const pages: PaginationPage[] = [];

// //     let pageIndex = 0;
// //     let startBlock = 0;

// //     for (let index = 0; index < blocks.length; index++) {
// //       const block = blocks[index];

// //       if (block.bottom > (pageIndex + 1) * pageHeight) {
// //         const previousBlock = blocks[index - 1];

// //         pages.push({
// //           index: pageIndex,

// //           startBlock,

// //           endBlock: index - 1,

// //           top: pageIndex * pageHeight,

// //           bottom: previousBlock?.bottom ?? pageHeight,
// //         });

// //         pageIndex++;

// //         startBlock = index;
// //       }
// //     }

// //     const lastBlock = blocks[blocks.length - 1];

// //     pages.push({
// //       index: pageIndex,

// //       startBlock,

// //       endBlock: blocks.length - 1,

// //       top: pageIndex * pageHeight,

// //       bottom: lastBlock.bottom,
// //     });

// //     return {
// //       blocks,
// //       pages,
// //       pageCount: pages.length,
// //     };
// //   }
// // }
// export class PaginationEngine {
//   measureBlocks(element: HTMLElement): PaginationBlock[] {
//     const containerTop = element.getBoundingClientRect().top;

//     return Array.from(element.children).map((block, index) => {
//       const rect = block.getBoundingClientRect();

//       return {
//         index,
//         top: rect.top - containerTop,
//         bottom: rect.bottom - containerTop,
//         height: rect.height,
//       };
//     });
//   }

//   // pageHeight = hauteur physique A4 en px → position des pages ;
//   // contentHeight = hauteur disponible pour le texte ;
//   // contentGap = espace de sécurité avant la séparation.

//   paginate(element: HTMLElement, pageHeight: number): PaginationResult {
//     const blocks = this.measureBlocks(element);

//     if (blocks.length === 0) {
//       return {
//         blocks,
//         pages: [
//           {
//             index: 0,
//             startBlock: 0,
//             endBlock: -1,
//             top: 0,
//             bottom: 0,
//           },
//         ],
//         pageCount: 1,
//       };
//     }

//     const pages: PaginationPage[] = [];

//     let pageIndex = 0;
//     let startBlock = 0;

//     for (let index = 0; index < blocks.length; index++) {
//       const block = blocks[index];

//       const pageBottom = (pageIndex + 1) * pageHeight;

//       if (block.bottom > pageBottom) {
//         const previousBlock = blocks[index - 1];

//         // Ne créer une page que si nous avons
//         // réellement du contenu dans la page actuelle.
//         if (index > startBlock) {
//           pages.push({
//             index: pageIndex,
//             startBlock,
//             endBlock: index - 1,
//             top: pageIndex * pageHeight,
//             bottom: previousBlock?.bottom ?? pageBottom,
//           });

//           pageIndex++;
//           startBlock = index;
//         }
//       }
//     }

//     const lastBlock = blocks[blocks.length - 1];

//     pages.push({
//       index: pageIndex,
//       startBlock,
//       endBlock: blocks.length - 1,
//       top: pageIndex * pageHeight,
//       bottom: lastBlock.bottom,
//     });

//     return {
//       blocks,
//       pages,
//       pageCount: pages.length,
//     };
//   }
// }
import type {
  PaginationBlock,
  PaginationPage,
  PaginationResult,
} from "./pagination-types";

export class PaginationEngine {
  measureBlocks(element: HTMLElement): PaginationBlock[] {
    const containerTop = element.getBoundingClientRect().top;

    return Array.from(element.children).map((block, index) => {
      const rect = block.getBoundingClientRect();

      return {
        index,
        top: rect.top - containerTop,
        bottom: rect.bottom - containerTop,
        height: rect.height,
      };
    });
  }

  paginate(element: HTMLElement, pageHeight: number): PaginationResult {
    const blocks = this.measureBlocks(element);

    if (blocks.length === 0) {
      return {
        blocks,
        pages: [
          {
            index: 0,
            startBlock: 0,
            endBlock: -1,
            top: 0,
            bottom: pageHeight,
          },
        ],
        pageCount: 1,
      };
    }

    const pages: PaginationPage[] = [];

    let pageIndex = 0;
    let startBlock = 0;

    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index];

      if (block.bottom > (pageIndex + 1) * pageHeight) {
        const previousBlock = blocks[index - 1];

        pages.push({
          index: pageIndex,
          startBlock,
          endBlock: index - 1,
          top: pageIndex * pageHeight,
          bottom: previousBlock?.bottom ?? pageHeight,
        });

        pageIndex++;
        startBlock = index;
      }
    }

    const lastBlock = blocks[blocks.length - 1];

    pages.push({
      index: pageIndex,
      startBlock,
      endBlock: blocks.length - 1,
      top: pageIndex * pageHeight,
      bottom: lastBlock.bottom,
    });

    return {
      blocks,
      pages,
      pageCount: pages.length,
    };
  }

  /**
   * Déplace visuellement chaque bloc
   * vers sa page réelle.
   *
   * Le DOM Tiptap reste unique et éditable.
   */
  applyPageLayout(
    element: HTMLElement,
    result: PaginationResult,
    pageDistance: number,
  ) {
    const children = Array.from(element.children) as HTMLElement[];

    for (const block of children) {
      block.style.transform = "";
    }

    for (const page of result.pages) {
      const offset = page.index * pageDistance;

      for (let index = page.startBlock; index <= page.endBlock; index++) {
        const block = children[index];

        if (!block) {
          continue;
        }

        block.style.transform = `translateY(${offset}px)`;
      }
    }
  }
}
