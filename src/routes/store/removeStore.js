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
    // TODO: REMOVE MERCH ON STRIPE

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove store");
  }
};
