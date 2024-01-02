const languageList = require("../../../db/data/app/languageList.json");
// const translate = require("google-translate-api");
// const translateString = require("../../translator/translateString");

module.exports = (props) => {
  const { language } = props;
  if (!language) return [""];
  const localeList = language.split(",").filter((item) => item);
  return localeList.map((lan) => {
    return {
      [lan]: {
        name: languageList[lan].name,
        label: languageList[lan].label,
        value: languageList[lan].value,
        // name: languageList[lan].name,
      },
    };
  });
};
