import type { GetPagesProps } from "@app/page";
import Page from "@dbSchema/page";

export const getPages = async ({ appId, languageId, pageId }: GetPagesProps) => {
  if (languageId) {
    return await Page.find({ appId, languageId });
  }
  if (appId) {
    return await Page.find({ appId });
  }
  if (pageId) {
    return await Page.findOne({ pageId });
  }
};
