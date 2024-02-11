import { StoreRequest } from "@app/request";
import { CartBody } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { createCheckoutSession } from "@utils/stripe/payments/createCheckoutSession";
import { formatMerchData } from "@utils/stripe/webhook/formatMerchData";
import type { Response } from "express";

export const checkoutSession = async (req: StoreRequest<{ cart: CartBody }>, res: Response) => {
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
