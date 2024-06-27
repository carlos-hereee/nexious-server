import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import { MinAppResponseData, StoreRequest } from "@app/request";

export const minStoreData = async (req: StoreRequest, res: Response) => {
  try {
    // init response data
    const data: MinAppResponseData = {};
    // populate user data required by client
    if (req.user) {
      // depopulate auth data for security
      const user = await req.user.depopulate("auth").populate("ownedApps subscriptions permissions notifications");
      data.user = user;
    }
    // populate app data required by client
    if (req.project) {
      const app = await req.project.populate("owner adminIds landing pages calendar notifications");
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
