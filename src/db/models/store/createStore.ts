import { CreateStoreSchema } from "@app/store";
import Store from "@dbSchema/store";

export const createStore = async (payload: CreateStoreSchema) => {
  return await Store.create(payload);
};
