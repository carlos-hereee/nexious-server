import type { IThemeList } from "@app/db";
import themes from "@data/app/themeList.json";

export const formatThemeList = (theme: string): IThemeList[] => {
  if (!theme) return themes;
  const themeList = theme.split(",").filter((item) => item);

  return themeList.map((tl) => {
    return { ...themes[tl] };
  });
};
