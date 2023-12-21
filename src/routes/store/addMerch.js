const createMerch = require("../../db/models/merch/createMerch");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const addPrice = require("../../utils/stripe/merch/addPrice");
const addProduct = require("../../utils/stripe/merch/addProduct");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const { name, description, inStock, cost, hero: h } = req.body;
    const { storeId, accountId, currency } = req.store;
    const hero = req.asset || h || "";
    const payload = { hero, name, description, inStock, cost, storeId };
    const productInfo = { name, description, images: [hero], stripeAccount: accountId };
    // add to stripe
    const product = await addProduct(productInfo);
    payload.productId = product.id;
    // add price to product
    const price = await addPrice({ id: product.id, cost, currency });
    payload.priceId = price.id;
    // add merch to db
    const merch = await createMerch(payload);
    // create ref to merch on store inventory
    req.store.inventory.push(merch._id);
    await req.store.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
