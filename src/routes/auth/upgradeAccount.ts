import type { IAuth } from "@app/auth";
import type { AuthRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { createCheckoutSession } from "@utils/stripe/payments/createCheckoutSession";
import type { Response } from "express";

export const upgradeAccount = async (req: AuthRequest<IAuth>, res: Response) => {
  try {
    const { accountTier } = req.body;
    if (accountTier.priceId && accountTier.name !== req.user.accountTier.name) {
      // redirect user if account upgrade when upgrading account
      const subscriptionInfo = [{ priceId: accountTier.priceId, quantity: 1 }];
      const session = await createCheckoutSession({ cart: subscriptionInfo, accountId: "", mode: "subscription" });
      return res.status(200).json(session.url).end();
    }
  } catch (error) {
    useGenericErrors(res, error);
  }
};
