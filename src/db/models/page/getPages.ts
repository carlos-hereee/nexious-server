import type { GetPagesProps } from "@app/page";
import Page from "@db/schema/page";

export const getPage = async ({ pageId, id }: GetPagesProps) => {
  if (pageId) {
    return await Page.findOne({ pageId });
  }
  if (id) {
    return await Page.findOne({ _id: id });
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
