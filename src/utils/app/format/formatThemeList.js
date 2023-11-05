module.exports = (themeList) => {
  if (!themeList) return "";
  return themeList.split(",").filter((item) => item);
};
