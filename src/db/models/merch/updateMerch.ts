import Merch from "@dbSchema/merch";

export = async ({ storeId }, payload) => {
  return await Merch.updateOne({ storeId }, { $set: payload });
};
