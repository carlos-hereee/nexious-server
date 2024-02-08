import type { IThemeList } from "@app/app";
import themes from "@data/app/themeList.json";

export const formatThemeList = (theme: string) => {
  const t: IThemeList[] = themes;
  const themeList = theme.split(",").filter((item) => item);
  if (!themeList || themeList.length === 0) return [];

  return t.filter((tl) => {
    if (themeList.includes(tl.value)) return tl;
  });
};
