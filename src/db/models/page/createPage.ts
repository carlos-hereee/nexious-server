import Page from "@dbSchema/page";

export const createPage = async (payload) => {
  // const page = new Page(payload);
  return await Page.create(payload);
};
