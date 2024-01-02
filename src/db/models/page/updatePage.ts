const Page = require("../../schema/page");

export = async ({ pageId }, payload) => {
  return await Page.updateOne({ pageId }, { $set: payload });
};
