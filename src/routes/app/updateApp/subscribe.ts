import type { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const subscribe = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // key variable
    const id = req.project._id;
    // if user is already subscribe
    if (req.user.subscriptions.includes(id)) {
      // remove subscription
      req.user.subscriptions = req.user.subscriptions.filter((sub) => sub.valueOf() !== id.valueOf());
      // otherwise add subscription
    } else req.user.subscriptions.push(id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
