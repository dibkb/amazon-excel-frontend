export const enhanceDetails = (
  original: Record<string, string>,
  enhanced: Record<string, string>
) => {
  return {
    ...original,
    ...enhanced,
  };
};
