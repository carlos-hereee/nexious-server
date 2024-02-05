import type { RequestHandler } from "express";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { createCheckoutSession } from "@stripe/payments/createCheckoutSession";

export const checkoutSession: RequestHandler = async (req, res) => {
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
