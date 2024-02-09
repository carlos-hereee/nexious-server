import { deleteStore } from "@dbModels/store/deleteStore";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { removeAccount } from "@stripe/accounts/removeAccount";
import { NextFunction, Request, Response } from "express";

export const removeStore = async (req: Request, res: Response, next: NextFunction) => {
  if (req.store && req.myApp) {
    try {
      const { name } = req.store;
      // remove store from app menu
      req.myApp.menu = req.myApp.menu.filter((m) => m.name !== name);
      // remove stripe account
      if (req.store.accountId) await removeAccount({ id: req.store.accountId });
      // remove store and store items
      await deleteStore({ storeId: req.store.storeId });
      await req.myApp.save();
      // TODO: REMOVE MERCH ON STRIPE

      next();
    } catch (error) {
      useGenericErrors(res, error, "unable to remove store");
    }
  }
  // return res.status(400);
};
