const { v4 } = require("uuid");
const languageList = require("../../../db/data/app/languageList.json");

module.exports = (props) => {
  const { language, locale } = props;
  if (!language) return [""];
  const localeList = language.split(",").filter((item) => item);

  return {
    locale,
    languageList: localeList.map((lan) => {
      return { ...languageList[lan], locale: lan, uid: v4() };
    }),
  };
};
