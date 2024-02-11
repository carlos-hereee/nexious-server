import Page from "@db/schema/page";

export const createPage = async (payload) => {
  // const page = new Page(payload);
  return await Page.create(payload);
};
