import { StoreSchema } from "types/store";
import Store from "@db/schema/store";

export const createStore = async (payload: StoreSchema) => {
  return await Store.create(payload);
};
