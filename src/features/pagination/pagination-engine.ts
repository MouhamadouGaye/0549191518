export type PaginationMeasurement = {
  contentHeight: number;
  availableHeight: number;
  hasOverflow: boolean;
};

export class PaginationEngine {
  measure(
    element: HTMLElement,
    availableHeight: number,
  ): PaginationMeasurement {
    const contentHeight = element.scrollHeight;

    return {
      contentHeight,
      availableHeight,
      hasOverflow: contentHeight > availableHeight,
    };
  }
}
