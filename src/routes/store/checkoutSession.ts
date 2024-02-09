import type { CartRequest } from "@app/request";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { createCheckoutSession } from "@stripe/payments/createCheckoutSession";
import { formatMerchData } from "@stripe/webhook/formatMerchData";
import type { Response } from "express";

export const checkoutSession = async (req: CartRequest, res: Response) => {
  try {
    const cartData = formatMerchData(req.body.cart);
    const session = await createCheckoutSession({
      sessionOptions: { mode: "payment", line_items: cartData },
      stripeAccount: { stripeAccount: req.body.cart.accountId },
    });
    return res.status(200).json(session.url).end();
  } catch (error) {
    return useGenericErrors(res, error, "unable to create stripe session");
  }
};
