// import type {
//   PaginationBlock,
//   PaginationPage,
//   PaginationResult,
// } from "./pagination-types";

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

//   paginate(element: HTMLElement, pageHeight: number): PaginationResult {
//     const blocks = this.measureBlocks(element);

//     if (blocks.length === 0) {
//       const pages: PaginationPage[] = [
//         {
//           index: 0,
//           startBlock: 0,
//           endBlock: -1,
//         },
//       ];

//       return {
//         blocks,
//         pages,
//         pageCount: 1,
//       };
//     }

//     const pages: PaginationPage[] = [];

//     let pageIndex = 0;
//     let startBlock = 0;

//     for (let index = 0; index < blocks.length; index++) {
//       const block = blocks[index];

//       if (block.bottom > pageHeight && index > startBlock) {
//         pages.push({
//           index: pageIndex,
//           startBlock,
//           endBlock: index - 1,
//         });

//         pageIndex++;
//         startBlock = index;
//       }
//     }

//     pages.push({
//       index: pageIndex,
//       startBlock,
//       endBlock: blocks.length - 1,
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
      const pages: PaginationPage[] = [
        {
          index: 0,
          startBlock: 0,
          endBlock: -1,
          top: 0,
          bottom: pageHeight,
        },
      ];

      return {
        blocks,
        pages,
        pageCount: 1,
      };
    }

    const pages: PaginationPage[] = [];

    let pageIndex = 0;
    let startBlock = 0;
    let pageTop = 0;

    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index];

      if (block.bottom > pageTop + pageHeight && index > startBlock) {
        pages.push({
          index: pageIndex,
          startBlock,
          endBlock: index - 1,
          top: pageTop,
          bottom: pageTop + pageHeight,
        });

        pageIndex++;
        startBlock = index;
        pageTop = pageIndex * pageHeight;
      }
    }

    pages.push({
      index: pageIndex,
      startBlock,
      endBlock: blocks.length - 1,
      top: pageTop,
      bottom: pageTop + pageHeight,
    });

    return {
      blocks,
      pages,
      pageCount: pages.length,
    };
  }
}
