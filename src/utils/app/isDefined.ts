export const isDefined = (str: string): boolean => {
  if (str === undefined || str === "undefined") return false;
  if (str === null || str === "null") return false;
  return true;
};
