import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import { AppRequest } from "@app/request";

export const minAppData = async (req: AppRequest, res: Response) => {
  try {
    // depopulate auth data and populate data required by client
    const userData = "ownedApps subscriptions permissions subscriptions";
    // populate app data required by client
    const appData = "owner adminIds landing";
    const user = await req.user.depopulate("auth").populate(userData);
    const app = await req.project.populate(appData);
    res.status(200).json({ user, app }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
