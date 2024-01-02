import { v4 } from "uuid";
import themes from "../../../db/data/app/themeList.json";

export = (theme) => {
  if (!theme) return {};
  const themeList = theme.split(",").filter((item) => item);

  return themeList.map((tl) => {
    return { ...themes[tl], themeId: v4(), uid: v4() };
  });
};
