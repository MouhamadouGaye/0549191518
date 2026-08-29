// import type {
//   PaginationBlock,
//   PaginationMeasurement,
// } from "./pagination-types";

// export class PaginationEngine {
//   measure(
//     element: HTMLElement,
//     availableHeight: number,
//   ): PaginationMeasurement {
//     const contentHeight = element.scrollHeight;

//     return {
//       contentHeight,
//       availableHeight,
//       hasOverflow: contentHeight > availableHeight,
//     };
//   }

//   measureBlocks(element: HTMLElement): PaginationBlock[] {
//     const containerTop = element.getBoundingClientRect().top;

//     const blocks = Array.from(element.children);

//     return blocks.map((block, index) => {
//       const rect = block.getBoundingClientRect();

//       const top = rect.top - containerTop;

//       const bottom = rect.bottom - containerTop;

//       return {
//         index,
//         top,
//         bottom,
//         height: rect.height,
//       };
//     });
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
          },
        ],
      };
    }

    const pages: PaginationPage[] = [];

    let pageIndex = 0;
    let startBlock = 0;

    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index];

      if (block.bottom > pageHeight) {
        pages.push({
          index: pageIndex,
          startBlock,
          endBlock: index - 1,
        });

        pageIndex++;
        startBlock = index;
      }
    }

    pages.push({
      index: pageIndex,
      startBlock,
      endBlock: blocks.length - 1,
    });

    return {
      blocks,
      pages,
    };
  }
}
