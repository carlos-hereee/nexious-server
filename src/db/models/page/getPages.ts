import type { GetPagesProps } from "@app/page.js";
import Page from "@dbSchema/page.js";

export const getPage = async ({ pageId }: GetPagesProps) => {
  if (pageId) {
    return await Page.findOne({ pageId });
  }
};
export const getPages = async ({ appId, languageId }: GetPagesProps) => {
  if (languageId) {
    return await Page.find({ appId, languageId });
  }
  if (appId) {
    return await Page.find({ appId });
  }
};
