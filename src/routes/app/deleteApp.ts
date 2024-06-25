import { removeApp } from "@db/models/app/removeApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { AppRequest } from "types/request";
import { ObjectId } from "types/db";

export const deleteApp = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const appId = req.params.appId as unknown as ObjectId;
    // if match remove from owned app
    const removeFromOwned = req.user.ownedApps.filter((data) => data !== appId);
    req.user.ownedApps = removeFromOwned;
    await req.user.save();
    await removeApp({ appId: appId as unknown as string });
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};
