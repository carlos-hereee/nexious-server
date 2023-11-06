const { v4 } = require("uuid");
const languageList = require("../../../db/data/app/languageList.json");

module.exports = (languages) => {
  if (!languages) return [""];
  const localeList = languages.split(",").filter((item) => item);

  return localeList.map((lan) => {
    return { ...languageList[lan], locale: lan, uid: v4() };
  });
};
