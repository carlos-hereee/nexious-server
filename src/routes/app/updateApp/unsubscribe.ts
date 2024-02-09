import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Request, Response } from "express";

export const unsubscribe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.myApp) {
      req.user.subscriptions = req.user.subscriptions.filter((sub) => sub !== req.myApp?._id || "");
      await req.user.save();
      next();
    }
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
