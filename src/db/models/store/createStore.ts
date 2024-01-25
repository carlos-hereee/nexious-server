import Store from "@dbSchema/store.js";

export const createStore = async (payload) => {
  return await Store.create(payload);
};
