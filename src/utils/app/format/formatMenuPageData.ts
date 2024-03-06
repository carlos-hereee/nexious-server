import type { IMenu } from "@app/app";

export const formatMenuPageData = (pageName: string): IMenu => {
  return {
    isPage: true,
    value: pageName,
    link: `/${pageName}`,
    label: pageName,
  };
};
