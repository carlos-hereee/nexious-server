import type { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const subscribe = async (req: AppRequest, res: Response) => {
  try {
    // key variable
    const id = req.project.appId;
    // if user is already subscribe
    if (req.user.subscriptions.includes(id)) {
      // remove subscription
      req.user.subscriptions = req.user.subscriptions.filter((appId) => appId !== id);
      // otherwise add subscription
    } else req.user.subscriptions.push(id);
    await req.user.save();

    return res.status(200).json(req.user).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
