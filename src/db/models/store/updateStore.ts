import Store from "@dbSchema/store";

export = async ({ storeId }, payload) => {
  return await Store.updateOne({ storeId }, { $set: payload });
};
