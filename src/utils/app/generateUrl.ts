import mediaList from "@db/data/app/mediaList.json";
import type { IThemeList } from "@app/app";
import themes from "@db/data/app/themeList.json";

export const generateMediaUrl = (media: string, link: string) => {
  // if(meidamedia)
  return mediaList.links[media] + link || media;
};
export const generateStringUrl = (str: string) => str.split(" ").join("+").trim();

export const generateThemeList = (theme: string) => {
  const t: IThemeList[] = themes;
  const themeList = theme.split(",").filter((item) => item);
  if (!themeList || themeList.length === 0) return [];

  return t.filter((tl) => {
    if (themeList.includes(tl.value)) return tl;
  });
};
