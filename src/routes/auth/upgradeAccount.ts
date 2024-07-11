import { SubscriptionSchema } from "@app/app";
import type { AuthRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { createCheckoutSession } from "@utils/stripe/payments/createCheckoutSession";
import type { Response } from "express";

export const upgradeAccount = async (req: AuthRequest<SubscriptionSchema>, res: Response) => {
  try {
    const accountTier = req.body;
    // no price id
    if (!accountTier.priceId) return res.status(404).end();

    // populate user data
    await req.user.populate("accountTier");
    const userAccount = req.user.accountTier as unknown as SubscriptionSchema;

    // key variables
    const cart = {
      // subscription payload
      cart: [{ priceId: accountTier.priceId, quantity: 1 }],
      // attach userId to refrence after checkout
      metadata: { userId: req.user.userId, productId: accountTier.productId || "" },
    };

    // no user subscription
    if (!userAccount?.name || accountTier.name !== userAccount?.name) {
      // // redirect user if account upgrade when upgrading account
      const session = await createCheckoutSession({ ...cart, mode: "subscription" });
      return res.status(200).json(session.url).end();
    }
  } catch (error) {
    useGenericErrors(res, error);
  }
};
