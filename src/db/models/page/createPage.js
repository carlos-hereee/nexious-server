const Page = require("../../schema/page");

module.exports = async (payload) => {
  // const page = new Page(payload);
  return await Page.create(payload);
};
