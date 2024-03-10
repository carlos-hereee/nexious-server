import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import { AppRequest } from "@app/request";

export const minAppData = async (req: AppRequest, res: Response) => {
  try {
    // populate data required by client
    const userData = "ownedApps subscriptions permissions subscriptions";
    // populate app data required by client
    const appData = "owner adminIds landing pages";
    // depopulate auth data
    const user = await req.user.depopulate("auth").populate(userData);
    const app = await req.project.populate(appData);
    res.status(200).json({ user, app }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
