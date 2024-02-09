import { IStoreSchema } from "@app/store";
import Store from "@dbSchema/store";

export const createStore = async (payload: IStoreSchema) => {
  return await Store.create(payload);
};
