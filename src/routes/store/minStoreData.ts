import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import type { MinAppResponseData, StoreRequest } from "@app/request";

export const minStoreData = async (req: StoreRequest, res: Response) => {
  try {
    // init response data
    const data: MinAppResponseData = {};
    // populate user data required by client
    if (req.user) {
      // depopulate auth data for security
      const userData = `ownedApps subscriptions permissions ownedApps.userId${
        req.user.notifications ? " notifications" : ""
      }${req.user.subscriptions ? " subscriptions" : ""}${req.user.accountTiers ? " accountTiers" : ""}`;

      const user = await req.user.depopulate("auth").populate(userData);
      data.user = user;
    }
    // populate app data required by client
    if (req.project) {
      const appData = `owner adminIds landing pages calendar notifications${req.project.subscriptions ? " subscriptions" : ""}`;
      const app = await req.project.populate(appData);
      data.app = app;
    }
    // populate inventory in response
    if (req.store) {
      const store = await req.store.populate("inventory");
      data.store = store;
    }
    // populate inventory in response
    if (req.account) data.account = req.account;
    res.status(200).json(data).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
