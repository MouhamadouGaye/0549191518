// export type PaginationMeasurement = {
//   contentHeight: number;
//   availableHeight: number;
//   hasOverflow: boolean;
// };

// export type PaginationBlock = {
//   index: number;
//   top: number;
//   bottom: number;
//   height: number;
// };

// export type PaginationPage = {
//   index: number;
//   startBlock: number;
//   endBlock: number;
// };

// // export type PaginationResult = {
// //   pages: PaginationPage[];
// //   blocks: PaginationBlock[];
// // };

// export type PaginationResult = {
//   blocks: PaginationBlock[];
//   pages: PaginationPage[];
//   pageCount: number;
// };
export type PaginationBlock = {
  index: number;
  top: number;
  bottom: number;
  height: number;
};

export type PaginationPage = {
  index: number;
  startBlock: number;
  endBlock: number;
  top: number;
  bottom: number;
};

export type PaginationResult = {
  blocks: PaginationBlock[];
  pages: PaginationPage[];
  pageCount: number;
};

export type PaginationState = {
  blocks: PaginationBlock[];
  pages: PaginationPage[];
  pageCount: number;
  activePage: number;
};
