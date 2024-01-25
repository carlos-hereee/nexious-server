import Merch from "@dbSchema/merch.js";
import Store from "@dbSchema/store.js";

export const deleteStore = async ({ storeId }) => {
  // if (appId) return await Store.findOneAndDelete({ appId });
  const store = await Store.findOneAndDelete({ storeId });
  if (store) {
    const merch = await Merch.deleteMany({ storeId });
    console.log("merch :>> ", merch);
    return { store, merch };
  }
  return { store };
};
