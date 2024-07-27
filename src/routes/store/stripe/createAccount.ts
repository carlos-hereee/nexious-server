import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import type { StoreRequest } from "@app/request";
import { addAccount } from "@utils/stripe/accounts/updateAccount";
import { accountLinks } from "@utils/stripe/accounts/generateLinkSession";

export const createAccount = async (req: StoreRequest, res: Response) => {
  try {
    // key variables
    const { country, email } = req.project;
    const account = await addAccount({ addAccount: { country, email, type: "standard" } });
    //  account creatation failed
    if (!account.id) return res.status(400).json("unable to create stripe link").end();
    // link stripe account to store
    req.store.accountId = account.id;
    // save to db
    await req.store.save();
    // start onboading
    const accountLink = await accountLinks({ accountId: req.store.accountId });
    res.status(200).json(accountLink.url).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
