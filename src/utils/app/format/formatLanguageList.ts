import languageList from "../../../db/data/app/languageList.json";
// import translate  from "google-translate-api";
// import translateString  from "../../translator/translateString";

export = (props) => {
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
