import { CreateStoreSchema } from "@app/store";
import Store from "@db/schema/store";

export const createStore = async (payload: CreateStoreSchema) => {
  return await Store.create(payload);
};
