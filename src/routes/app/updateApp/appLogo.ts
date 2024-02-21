import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateAppLogo = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // req.asset middleware yields asset url
    req.project.logo = req.asset || "";
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occurred updating app resources");
  }
};
