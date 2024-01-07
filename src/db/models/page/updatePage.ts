import Page from "@dbSchema/page";

export = async ({ pageId }, payload) => {
  return await Page.updateOne({ pageId }, { $set: payload });
};
