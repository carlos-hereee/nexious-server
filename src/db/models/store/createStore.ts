import Store from "@dbSchema/store";

export const createStore = async (payload) => {
  return await Store.create(payload);
};
