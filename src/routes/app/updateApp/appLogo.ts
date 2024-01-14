import type { RequestHandler } from "express";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateAppLogo: RequestHandler = async (req, res, next) => {
  try {
    if (req.myApp) {
      // // update appname
      // req.myApp.appName = req.body.appName;
      // req.asset middleware yields asset url
      req.myApp.logo = req.asset || "";
      await req.myApp.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occurred updating app resources");
  }
};
