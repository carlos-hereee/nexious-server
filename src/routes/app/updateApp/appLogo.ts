import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Request, Response } from "express";

export const updateAppLogo = async (req: Request, res: Response, next: NextFunction) => {
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
