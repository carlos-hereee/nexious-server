const Merch = require("../../schema/merch");
const Store = require("../../schema/store");

// export   = async({ storeId, appId }) => {
export = async ({ storeId }) => {
  // if (appId) return await Store.findOneAndDelete({ appId });
  const store = await Store.findOneAndDelete({ storeId });
  if (store) {
    const merch = await Merch.deleteMany({ storeId });
    console.log("merch :>> ", merch);
    return { store, merch };
  }
  return { store };
};
