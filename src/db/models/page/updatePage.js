const Page = require("../../schema/page");

module.exports = async ({ pageId }, payload) => {
  return await Page.updateOne({ pageId }, { $set: payload });
};
