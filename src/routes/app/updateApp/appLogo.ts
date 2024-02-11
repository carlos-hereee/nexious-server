import { AppBody } from "@app/app";
import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateAppLogo = async (req: AppRequest<AppBody>, res: Response, next: NextFunction) => {
  try {
    // req.asset middleware yields asset url
    req.myApp.logo = req.asset || "";
    await req.myApp.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occurred updating app resources");
  }
};
