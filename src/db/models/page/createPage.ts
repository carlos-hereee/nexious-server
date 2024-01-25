import Page from "@dbSchema/page.js";

export const createPage = async (payload) => {
  // const page = new Page(payload);
  return await Page.create(payload);
};
