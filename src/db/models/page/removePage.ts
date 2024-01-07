import Page from "@dbSchema/page";

export = async ({ pageId, appId }) => {
  return await Page.findOneAndDelete({ pageId, appId });
};
