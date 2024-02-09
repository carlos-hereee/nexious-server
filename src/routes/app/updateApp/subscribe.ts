import { AppRequest } from "@app/request";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Response } from "express";

export const subscribe = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.myApp) {
      req.user.subscriptions.push(req.myApp._id);
      await req.user.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
