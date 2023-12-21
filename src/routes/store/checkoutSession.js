const useGenericErrors = require("../../utils/auth/useGenericErrors");
const createCheckoutSession = require("../../utils/stripe/payments/createCheckoutSession");

module.exports = async (req, res) => {
  try {
    const session = await createCheckoutSession({ cartData: req.cart, mode: "payment" });
    res.status(200).json(session.url);
  } catch (error) {
    useGenericErrors(res, error, "unable to create stripe session");
  }
};
