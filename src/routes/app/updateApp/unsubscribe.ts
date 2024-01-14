import type { RequestHandler } from "express";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const unsubscribe: RequestHandler = async (req, res, next) => {
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
