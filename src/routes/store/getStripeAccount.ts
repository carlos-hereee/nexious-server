// import type { RequestHandler } from "express";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import { getAccount } from "@stripe/accounts/getAccount.js";
import type { RequestHandler } from "express";

export const getStripeAccount: RequestHandler = async (req, res) => {
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
