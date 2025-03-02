export function validateAsin(input: string) {
  if (input.length === 10) {
    return input;
  } else {
    const split = input.split("/dp/")[1];
    if (split) {
      const asin = split.split("/")[0];
      if (asin.length === 10) {
        return asin;
      }
    }
  }
  return false;
}
