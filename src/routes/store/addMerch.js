const createMerch = require("../../db/models/merch/createMerch");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const addProduct = require("../../utils/stripe/merch/addProduct");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const { name, description, inStock, cost, hero: h } = req.body;
    const hero = req.asset || h || "";
    const { storeId, accountId } = req.store;
    const payload = { hero, name, description, inStock, cost, storeId };
    const productInfo = { name, description, images: [hero], stripeAccount: accountId };
    // add to stripe
    const product = await addProduct(productInfo);
    payload.productId = product.id;

    // add merch to db
    const merch = await createMerch(payload);
    // create ref to merch on store inventory
    req.store.inventory.push(merch._id);
    // console.log("product :>> ", product);
    // console.log("merch :>> ", merch);
    // return;
    await req.store.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
