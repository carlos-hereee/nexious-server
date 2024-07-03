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
      console.log("session :>> ", session);
      // // update user accoutn
      // req.user.accountTier = accountTier;
      // // save to db
      // await req.user.save();
    }
  } catch (error) {
    useGenericErrors(res, error);
  }
};
