import { removeApp } from "@dbModels/app/removeApp.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import type { RequestHandler } from "express";

export const deleteApp: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      const appId = req.params.appId;
      // if match remove from owned app
      const removeFromOwned = req.user.ownedApps.filter((data) => data !== appId);
      req.user.ownedApps = removeFromOwned;
      await req.user.save();
      await removeApp({ appId });
    }
    next();
    // const appList = await getApp({ all: true });
    // res.status(200).json({ user: req.user, appList }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};
