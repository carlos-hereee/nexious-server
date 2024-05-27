import { StoreRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { getAccount } from "@utils/stripe/accounts/getAccount";
import { NextFunction, Response } from "express";

export const getStripeAccount = async (req: StoreRequest, res: Response, next: NextFunction) => {
  try {
    const { accountId, onBoardingRequired } = req.store;
    if (accountId) {
      const account = await getAccount({ id: accountId });
      // if account onboarding is required and account charges has been enabled
      if (account.charges_enabled && onBoardingRequired) {
        // update onboarding requirement
        req.store.onBoardingRequired = false;
        // save data to db
        await req.store.save();
      }
      req.account = account;
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to get account");
  }
};
