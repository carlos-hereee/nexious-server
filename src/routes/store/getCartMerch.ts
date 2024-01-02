// const getMerch = require("../../db/models/merch/getMerch");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    const { cart } = req.body;
    // get list of ids
    // const merchIds = cart.map((c) => c.merchId);
    // populate ids
    // const cartIdx = cart.findIndex((c) => c.merchId === m.uid);
    // const merch = await getMerch({ merchIds: merchIds });
    // // add quantities
    req.cart = cart.merch.map((m) => {
      return {
        // price_data: {
        //   // todo: add preferred currency to products
        //   currency: m?.currency || "usd",
        //   product_data: { name: m.name },
        //   unit_amount: m.cost,
        //   // metadata: { storeId: cart[cartIdx].storeId, merchId: m.merchId },
        // },
        price: m.productId,
        quantity: m.quantity || 1,
      };
    });

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to retrieve merch data");
  }
};
