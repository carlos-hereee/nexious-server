import { removeApp } from "@db/models/app/removeApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { AppRequest } from "@app/request";
import { ObjectId } from "@app/db";

export const deleteApp = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const appId = req.params.appId as unknown as ObjectId;
    // if match remove from owned app
    const removeFromOwned = req.user.ownedApps.filter((data) => data !== appId);
    req.user.ownedApps = removeFromOwned;
    await req.user.save();
    await removeApp({ appId: appId as unknown as string });
    next();
    // const appList = await getApp({ all: true });
    // res.status(200).json({ user: req.user, appList }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};
