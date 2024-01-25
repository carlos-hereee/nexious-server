import { deleteStore } from "@dbModels/store/deleteStore.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import { removeAccount } from "@stripe/accounts/removeAccount.js";
import type { RequestHandler } from "express";

export const removeStore: RequestHandler = async (req, res, next) => {
  try {
    if (req.store && req.myApp) {
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
    }
  } catch (error) {
    useGenericErrors(res, error, "unable to remove store");
  }
};
