import type { IThemeList } from "@app/app.js";
import themes from "@data/app/themeList.json" assert { type: "json" };

export const formatThemeList = (theme: string): IThemeList[] => {
  if (!theme) return themes;
  const themeList = theme.split(",").filter((item) => item);

  return themeList.map((tl) => {
    return { ...themes[tl] };
  });
};
