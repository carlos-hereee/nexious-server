import Page from "@dbSchema/page.js";

export const removePage = async ({ pageId, appId }) => {
  return await Page.findOneAndDelete({ pageId, appId });
};
