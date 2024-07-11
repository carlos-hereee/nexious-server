import type { AuthRequest, MinAppResponseData } from "@app/request";
import { getAllApps } from "@db/models/app/getApp";
import { getPlatformSubs } from "@db/models/subscription/getSubscription";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const getPlatformData = async (req: AuthRequest, res: Response) => {
  try {
    const data: MinAppResponseData = {};
    if (req.user) {
      // depopulate auth data and populate data required by client
      const userData = `ownedApps subscriptions permissions ownedApps.userId${
        req.user.notifications ? " notifications" : ""
      }${req.user.subscriptions ? " subscriptions" : ""}${req.user.accountTier ? " accountTier" : ""}`;
      // user data
      const user = await req.user.depopulate("auth").populate(userData);
      data.user = user;
    }
    // applist data
    const appList = await getAllApps({ all: true });
    // platform data
    const platformTiers = await getPlatformSubs();
    data.appList = appList;
    data.platformTiers = platformTiers;
    res.status(200).json(data).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
