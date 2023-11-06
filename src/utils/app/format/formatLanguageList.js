const { v4 } = require("uuid");
const languageList = require("../../../db/data/app/languageList.json");
const translate = require("google-translate-api");
// const translateString = require("../../translator/translateString");

module.exports = (props, appData) => {
  const { language, locale } = props;
  if (!language) return [""];
  const localeList = language.split(",").filter((item) => item);
  return {
    locale,
    languageList: localeList.map((lan) => {
      return { ...languageList[lan], locale: lan, uid: v4() };
    }),
  };

  // return langList.map(async (lang) => {
  //   const currentLocale = lang.locale;
  //   if (locale === currentLocale) {
  //     return { ...appData, language: { locale, languageList: langList }, appId: v4() };
  //   } else {
  //     console.log("lang :>> ", lang);
  //     const translate = await translateString("this to spanish", lang.locale);
  //     console.log("translate :>> ", translate);
  //   }
  // });
};
