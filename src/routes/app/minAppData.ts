import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import { AppRequest, MinAppResponseData } from "types/request";

export const minAppData = async (req: AppRequest, res: Response) => {
  try {
    // init response data
    const data: MinAppResponseData = {};
    // populate user data required by client
    if (req.user) {
      const userData = "ownedApps subscriptions permissions notifications";
      // depopulate auth data for security
      const user = await req.user.depopulate("auth").populate(userData);
      data.user = user;
    }
    // populate app data required by client
    if (req.project) {
      const appData = "owner adminIds landing pages calendar notifications";
      const app = await req.project.populate(appData);
      data.app = app;
    }
    // populate inventory in response
    if (req.store) {
      const store = await req.store.populate("inventory");
      data.store = store;
    }
    res.status(200).json(data).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
