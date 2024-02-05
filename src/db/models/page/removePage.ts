import Page from "@dbSchema/page";

export const removePage = async ({ pageId, appId }) => {
  return await Page.findOneAndDelete({ pageId, appId });
};
