import type { AuthRequest, MinAppResponseData } from "@app/request";
import { getAllApps } from "@db/models/app/getApp";
import { getPosts } from "@db/models/posts/getPosts";
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
      }${req.user.subscriptions ? " subscriptions" : ""}${req.user.accountTier ? " accountTier" : ""}${req.user.orders ? " orders" : ""}`;
      // user data
      const user = await req.user.depopulate("auth").populate(userData);
      data.user = user;
    }
    // applist data
    const appList = await getAllApps({ all: true });
    // platform data
    const platformTiers = await getPlatformSubs();
    const posts = await getPosts({ all: true });
    // platform posts
    data.appList = appList;
    data.posts = posts;
    data.platformTiers = platformTiers;
    res.status(200).json(data).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
