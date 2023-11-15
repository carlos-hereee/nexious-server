module.exports = (str) => {
  if (str === undefined || str === "undefined") return false;
  if (str === null || str === "null") return false;
  return true;
};
