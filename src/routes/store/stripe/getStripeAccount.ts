import { StoreRequest } from "types/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { getAccount } from "@utils/stripe/accounts/getAccount";
import { NextFunction, Response } from "express";

export const getStripeAccount = async (req: StoreRequest, res: Response, next: NextFunction) => {
  try {
    const { accountId, onBoardingRequired, isStripeActive } = req.store;
    if (accountId) {
      const account = await getAccount({ id: accountId });
      // if account onboarding is required and account charges has been enabled
      if (account.charges_enabled && !isStripeActive) {
        // update onboarding requirement
        if (onBoardingRequired) req.store.onBoardingRequired = false;
        // set online store to active
        if (!isStripeActive) req.store.isStripeActive = true;
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
