import { StoreUpdateWithStripe } from "@app/store";
import Store from "@db/schema/store";

export const updateStore = async (accountId: string, payload: StoreUpdateWithStripe) => {
  return await Store.updateOne({ accountId }, { $set: payload });
};
