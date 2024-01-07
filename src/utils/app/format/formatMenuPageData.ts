import type { IMenu } from "@app/app";

export const formatMenuPageData = (pageName: string): IMenu => {
  return {
    category: "page",
    isPage: true,
    name: pageName,
    value: pageName,
    link: `/${pageName}`,
    label: pageName,
  };
};
