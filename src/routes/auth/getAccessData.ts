import { AuthRequest } from "@app/request";
import { getAllApps } from "@db/models/app/getApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const getAccessData = async (req: AuthRequest, res: Response) => {
  try {
    // depopulate auth data and populate data required by client
    const userData = req.user.notifications
      ? "ownedApps subscriptions permissions ownedApps.userId ownedApps.notifications notifications"
      : "ownedApps subscriptions permissions ownedApps.userId ownedApps.notifications";
    const user = await req.user.depopulate("auth").populate(userData);
    const appList = await getAllApps({ all: true });
    res.status(200).json({ appList, user }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
