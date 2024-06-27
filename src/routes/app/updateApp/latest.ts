import type { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { updates } from "./updates";

export const latest = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // key variable
    updates(req.project);
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
