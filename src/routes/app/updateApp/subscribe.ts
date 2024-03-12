import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const subscribe = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // if user is already subscribe
    if (req.user.subscriptions.includes(req.project._id)) {
      // remove subscription
      req.user.subscriptions = req.user.subscriptions.filter((sub) => sub === req.project._id);
      // otherwise add subscription
    } else req.user.subscriptions.push(req.project._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
