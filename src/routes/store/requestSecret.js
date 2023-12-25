const formatTotal = require("../../utils/app/format/formatTotal");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const paymentInitent = require("../../utils/stripe/payments/paymentInitent");

module.exports = async (req, res) => {
  try {
    const { cart } = req.body;
    const total = formatTotal(cart);
    const intent = await paymentInitent({ amount: total });

    console.log("intent :>> ", intent);
    res.status(200).json(intent.client_secret).end();
    // console.log("user :>> ", user);
    // // console.log("payment :>> ", payment);
    // console.log("cart :>> ", cart);
  } catch (error) {
    useGenericErrors(res, error, "unable to complete checkout");
  }
};
