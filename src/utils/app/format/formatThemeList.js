const { v4 } = require("uuid");
const themes = require("../../../db/data/app/themeList.json");

module.exports = (theme) => {
  if (!theme) return {};
  const themeList = theme.split(",").filter((item) => item);

  return themeList.map((tl) => {
    return { ...themes[tl], themeId: v4(), uid: v4() };
  });
};
