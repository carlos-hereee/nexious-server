const { v4 } = require("uuid");
const languageList = require("../../../db/data/app/languageList.json");

module.exports = (locale) => {
  return { ...languageList[locale], locale, uid: v4() };
};
