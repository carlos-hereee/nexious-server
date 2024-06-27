import { deleteStore } from "@db/models/store/deleteStore";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { removeAccount } from "@utils/stripe/accounts/removeAccount";
import { NextFunction, Response } from "express";
import { StoreRemovalRequest } from "@app/request";

export const removeStore = async (req: StoreRemovalRequest, res: Response, next: NextFunction) => {
  try {
    const { accountId, storeId } = req.store;
    // remove store from app menu
    req.project.menu = req.project.menu.filter((m) => m.uid !== storeId);
    // remove stripe account
    if (accountId) await removeAccount({ id: accountId });
    // remove store and store items
    if (storeId) await deleteStore({ storeId });
    await req.project.save();
    // TODO: REMOVE MERCH ON STRIPE

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove store");
  }
};
