const createMerch = require("../../db/models/merch/createMerch");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const addProduct = require("../../utils/stripe/merch/addProduct");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const { name, description, inStock, cost, hero: h } = req.body;
    const hero = req.asset || h || "";
    const { storeId } = req.store;
    // add to stripe
    const product = await addProduct({ name, description, images: [hero] });
    // add merch to db
    const merch = await createMerch({ hero, name, description, inStock, cost, storeId });
    console.log("product :>> ", product);
    // create ref to merch on store inventory
    req.store.inventory.push(merch._id);
    // return;
    await req.store.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
