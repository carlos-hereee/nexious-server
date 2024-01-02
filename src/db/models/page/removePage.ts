const Page = require("../../schema/page");

export = async ({ pageId, appId }) => {
  return await Page.findOneAndDelete({ pageId, appId });
};
