import { StoreRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { addFunds } from "@utils/stripe/funds/addFunds";
// import { handlePayouts } from "@utils/stripe/funds/addFunds";
// import { getAccount } from "@utils/stripe/accounts/getAccount";
import { NextFunction, Response } from "express";

export const managePayouts = async (req: StoreRequest<{ amount: string }>, res: Response, next: NextFunction) => {
  try {
    const { accountId, currency } = req.store;
    const { option } = req.params;
    const amount = parseInt(req.body.amount, 10);
    console.log("payout :>> ", amount);
    if (accountId && option === "withdraw") {
      // const payout = await handlePayouts({ id: accountId });
      // return res.status(200).json(balance).end();
    }
    if (accountId && option === "deposit") {
      const funds = await addFunds({ id: accountId, updateFunds: { amount, currency } });
      console.log("funds :>> ", funds);
      // const payout = await handlePayouts({ id: accountId });
      // return res.status(200).json(balance).end();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to get account");
  }
};
