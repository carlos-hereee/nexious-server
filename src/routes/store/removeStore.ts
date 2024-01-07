import { deleteStore } from "@dbModels/store/deleteStore";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { removeAccount } from "@stripe/accounts/removeAccount";
import type { MiddlewareProps } from "@app/db";

export const removeStore: MiddlewareProps = async (req, res, next) => {
  try {
    // remove store from app menu
    req.app.menu = req.app.menu.filter((m) => m.name !== req.store.name);
    // remove stripe account
    if (req.store.accountId) await removeAccount({ id: req.store.accountId });
    // remove store and store items
    await deleteStore({ storeId: req.store.storeId });
    await req.app.save();
    // TODO: REMOVE MERCH ON STRIPE

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove store");
  }
};
