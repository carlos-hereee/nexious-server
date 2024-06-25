import type { IMenu } from "types/app";

type MenuItem = {
  pageName: string;
  category: "store" | "page" | "calendar";
  menuId: string;
  link: string;
};
export const formatMenuPageData = ({ pageName, category, menuId, link }: MenuItem): IMenu => {
  return { category, value: pageName, link, label: pageName, menuId };
};
