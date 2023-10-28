const Page = require("../../schema/page");

module.exports = async ({ appId, languageId }) => {
  if (languageId) {
    return await Page.find({ appId, languageId });
  }
  if (appId) {
    return await Page.find({ appId });
  }
};
