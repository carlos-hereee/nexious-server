import type { IThemeList } from "types/app";
import themes from "@db/data/app/themeList.json";

export const formatThemeList = (theme: string) => {
  const t: IThemeList[] = themes;
  const themeList = theme.split(",").filter((item) => item);
  if (!themeList || themeList.length === 0) return [];

  return t.filter((tl) => {
    if (themeList.includes(tl.value)) return tl;
  });
};
