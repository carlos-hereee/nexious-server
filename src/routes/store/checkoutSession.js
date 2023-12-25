const useGenericErrors = require("../../utils/auth/useGenericErrors");
const createCheckoutSession = require("../../utils/stripe/payments/createCheckoutSession");

module.exports = async (req, res) => {
  try {
    const { accountId } = req.body.cart;
    // console.log("req.cart :>> ", req.cart);
    // console.log("accountId :>> ", accountId);
    const session = await createCheckoutSession({
      cartData: req.cart,
      mode: "payment",
      stripeAccount: accountId,
    });
    res.status(200).json(session.url).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to create stripe session");
  }
};
