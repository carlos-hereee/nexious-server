import type { RequestHandler } from "express";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";

export const subscribe: RequestHandler = async (req, res, next) => {
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
