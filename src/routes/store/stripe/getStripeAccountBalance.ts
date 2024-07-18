import type { StoreRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { getBalance } from "@utils/stripe/funds/getFunds";
// import { getAccount } from "@routes/webhook/accounts/getAccount";
import { NextFunction, Response } from "express";

export const getStripeAccountBalance = async (req: StoreRequest, res: Response, next: NextFunction) => {
  try {
    const { accountId } = req.store;
    if (accountId) {
      const balance = await getBalance({ id: accountId });
      return res.status(200).json(balance).end();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to get account");
  }
};
