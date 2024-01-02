// import removeMerch  from "../../db/models/merch/removeMerch";
// import getStore  from "../../db/models/store/getStore";
import removeStore  from "../../db/models/store/removeStore";
import useGenericErrors  from "../../utils/auth/useGenericErrors";
import removeAccount  from "../../utils/stripe/accounts/removeAccount";

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
