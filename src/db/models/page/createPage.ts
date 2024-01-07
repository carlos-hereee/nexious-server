import Page from "@dbSchema/page";

export = async (payload) => {
  // const page = new Page(payload);
  return await Page.create(payload);
};
