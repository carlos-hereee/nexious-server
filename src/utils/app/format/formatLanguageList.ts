import type { ILanguageList } from "@app/app";
import languageList from "@data/app/languageList.json";
// import translate  from "google-translate-api";
// import translateString  from "../../translator/translateString";

export const formatLanguageList = (language: string) => {
  const l: ILanguageList[] = languageList;
  const localeList = language.split(",").filter((item) => item);
  if (!localeList || localeList.length === 0) return [];
  return l.filter((lan) => {
    if (localeList.includes(lan.value)) return lan;
  });
};
