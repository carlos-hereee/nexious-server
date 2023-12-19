const useGenericErrors = require("../../utils/auth/useGenericErrors");
const createCheckoutSession = require("../../utils/stripe/payments/createCheckoutSession");

module.exports = async (req, res) => {
  try {
    const { cart } = req.body;
    // console.log("cart :>> ", cart);
    const cartData = cart.map((c) => {
      return {
        price_data: {
          currency: c?.currency || "usd",
          product_data: { name: c.name },
          unit_ammount: c.cost || 0,
        },
        quantity: c.quantity || 1,
      };
    });
    const session = await createCheckoutSession(cartData);
    console.log("session :>> ", session);
    res.redirect(303, session.url);
  } catch (error) {
    useGenericErrors(res, error, "unable to create stripe session");
  }
};
