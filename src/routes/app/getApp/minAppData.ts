import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import { AppRequest, MinAppResponseData } from "@app/request";

export const minAppData = async (req: AppRequest, res: Response) => {
  try {
    // init response data
    const response: MinAppResponseData = {};
    // populate user data required by client
    if (req.user) {
      const userData = "ownedApps subscriptions permissions";
      // depopulate auth data for security
      const user = await req.user.depopulate("auth").populate(userData);
      response.user = user;
    }
    // populate app data required by client
    if (req.project) {
      const appData = "owner adminIds landing pages calendar";
      const app = await req.project.populate(appData);
      response.app = app;
    }
    // populate inventory in response
    if (req.store) {
      console.log("req.store :>> ", req.store);
      const store = await req.store.populate("inventory");
      response.store = store;
    }

    res.status(200).json(response).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
