import Store from "@dbSchema/store.js";

export const updateStore = async ({ storeId }, payload) => {
  return await Store.updateOne({ storeId }, { $set: payload });
};
