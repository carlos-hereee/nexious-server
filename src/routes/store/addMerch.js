const createMerch = require("../../db/models/merch/createMerch");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const { name, body, inStock, cost, hero: h } = req.body;
    const hero = req.asset || h || "";
    const { storeId } = req.store;
    // add merch to db
    const merch = await createMerch({ hero, name, body, inStock, cost, storeId });
    // create ref to merch on store inventory
    req.store.inventory.push(merch._id);
    // return;
    await req.store.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
