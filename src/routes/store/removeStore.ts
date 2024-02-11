import { deleteStore } from "@dbModels/store/deleteStore";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { removeAccount } from "@stripe/accounts/removeAccount";
import { NextFunction, Response } from "express";
import { StoreRemovalRequest } from "@app/request";

export const removeStore = async (req: StoreRemovalRequest, res: Response, next: NextFunction) => {
  try {
    const { name, accountId, storeId } = req.store;
    // remove store from app menu
    req.myApp.menu = req.myApp.menu.filter((m) => m.name !== name);
    // remove stripe account
    if (accountId) await removeAccount({ id: accountId });
    // remove store and store items
    if (storeId) await deleteStore({ storeId });
    await req.myApp.save();
    // TODO: REMOVE MERCH ON STRIPE

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove store");
  }
};
