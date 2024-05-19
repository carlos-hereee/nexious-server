import type { IMenu } from "@app/app";

type MenuItem = {
  pageName: string;
  category: "store" | "page" | "calendar";
  uid: string;
  link: string;
};
export const formatMenuPageData = ({ pageName, category, uid, link }: MenuItem): IMenu => {
  return { category, value: pageName, link, label: pageName, uid };
};
