const Page = require("../../schema/page");

module.exports = async ({ appId, languageId, pageId }) => {
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
