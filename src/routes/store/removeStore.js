// const removeMerch = require("../../db/models/merch/removeMerch");
// const getStore = require("../../db/models/store/getStore");
const removeStore = require("../../db/models/store/removeStore");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const removeAccount = require("../../utils/stripe/accounts/removeAccount");

module.exports = async (req, res, next) => {
  try {
    // remove store from app menu
    req.app.menu = req.app.menu.filter((m) => m.name !== req.store.name);
    // remove stripe account
    if (req.store.accoundId) await removeAccount({ id: req.store.accoundId });
    // remove store and store items
    await removeStore({ storeId: req.store.storeId });
    await req.app.save();
    // TODO: REMOVE MERCH ON STRIPE

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove store");
  }
};
