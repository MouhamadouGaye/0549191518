export const PAGE_DIMENSIONS = {
  width: 210,
  height: 297,

  marginTop: 20,
  marginRight: 20,
  marginBottom: 20,
  marginLeft: 20,
} as const;

export const PAGE_CONTENT_HEIGHT =
  PAGE_DIMENSIONS.height -
  PAGE_DIMENSIONS.marginTop -
  PAGE_DIMENSIONS.marginBottom;
