import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import type { StoreRequest } from "@app/request";

import { addAccount } from "@utils/stripe/accounts/updateAccount";

export const createAccount = async (req: StoreRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const { country, email } = req.project;

    const account = await addAccount({ addAccount: { country, email, type: "standard" } });
    // // // add account id to payload
    // storeData.accountId = account.id;
    // req.store = store;
    // // save to db
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
