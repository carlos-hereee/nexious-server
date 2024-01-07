import Store from "@dbSchema/store";

export = async (payload) => {
  return await Store.create(payload);
};
