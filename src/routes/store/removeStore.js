// const removeMerch = require("../../db/models/merch/removeMerch");
// const getStore = require("../../db/models/store/getStore");
const removeStore = require("../../db/models/store/removeStore");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    // key variables
    // const appId = req.app.appId;
    const storeId = req.store.storeId;
    await removeStore({ storeId });

    // console.log("req.app :>> ", req.app.store);
    // const storeId = req.app.store.storeId;
    // remove store from db
    // console.log("store :>> ", store);
    // const del = await removeStore({ storeId });
    // console.log("appId :>> ", appId);
    // console.log("appId :>> ", del);
    // remove merch from db
    // await removeMerch({ storeId, appId });
    // remove store from app
    // req.app.store = {};
    // await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove store");
  }
};
