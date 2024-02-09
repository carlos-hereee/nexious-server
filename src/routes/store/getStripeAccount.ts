//
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { getAccount } from "@stripe/accounts/getAccount";
import { Request, Response } from "express";

export const getStripeAccount = async (req: Request, res: Response) => {
  try {
    // console.log("req.params :>> ", req.params);
    const { accountId } = req.params;
    const account = await getAccount({ id: accountId });
    // console.log("account :>> ", account);
    res.status(200).json(account).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to get account");
  }
};
