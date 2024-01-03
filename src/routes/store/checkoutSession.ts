import { useGenericErrors } from "../../utils/auth/useGenericErrors";
import createCheckoutSession from "../../utils/stripe/payments/createCheckoutSession";

export = async (req, res) => {
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
