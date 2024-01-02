const Page = require("../../schema/page");

module.exports = async ({ pageId, appId }) => {
  return await Page.findOneAndDelete({ pageId, appId });
};
