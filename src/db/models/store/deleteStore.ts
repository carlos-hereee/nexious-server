import { StoreFilters } from "types/store";
import Merch from "@db/schema/merch";
import Store from "@db/schema/store";

export const deleteStore = async ({ storeId }: StoreFilters) => {
  // if (appId) return await Store.findOneAndDelete({ appId });
  const store = await Store.findOneAndDelete({ storeId });
  if (store) {
    const merch = await Merch.deleteMany({ storeId: store._id });
    console.log("merch :>> ", merch);
    return { store, merch };
  }
  return { store };
};
