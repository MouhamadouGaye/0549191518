export type PaginationMeasurement = {
  contentHeight: number;
  availableHeight: number;
  hasOverflow: boolean;
};

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
};

export type PaginationResult = {
  pages: PaginationPage[];
  blocks: PaginationBlock[];
};
