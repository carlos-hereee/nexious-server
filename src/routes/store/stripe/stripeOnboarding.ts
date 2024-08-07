import { StripeRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { accountLinks } from "@utils/stripe/accounts/generateLinkSession";
import { Response } from "express";

export const stripeOnboarding = async (req: StripeRequest, res: Response) => {
  try {
    // if (req.user) console.log("user :>> ", req.user);
    if (req.store.accountId) {
      const accountLink = await accountLinks({ accountId: req.store.accountId });
      return res.status(200).json(accountLink.url);
    }
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store");
  }
};
