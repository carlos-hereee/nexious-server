import type { ILanguageList } from "@app/db";
import languageList from "@data/app/languageList.json";
// import translate  from "google-translate-api";
// import translateString  from "../../translator/translateString";

export const formatLanguageList = (language: string): ILanguageList[] => {
  const localeList = language.split(",").filter((item) => item);
  return localeList.map((lan) => {
    return languageList[lan];
  });
};
