const Page = require("../../schema/page");

module.exports = async ({ pageId }) => {
  return await Page.findOneAndDelete({ pageId });
};
