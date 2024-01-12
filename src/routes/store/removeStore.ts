import { deleteStore } from "@dbModels/store/deleteStore";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { removeAccount } from "@stripe/accounts/removeAccount";
import type { StoreRequestWare } from "@app/express";

export const removeStore: StoreRequestWare = async (req, res, next) => {
  try {
    if (req.store) {
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
