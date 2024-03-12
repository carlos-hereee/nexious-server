import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const subscribe = async (req: AppRequest, res: Response) => {
  try {
    // if user is already subscribe
    if (req.user.subscriptions.includes(req.project._id)) {
      // remove subscription
      req.user.subscriptions = req.user.subscriptions.filter((sub) => sub === req.project._id);
      // otherwise add subscription
    } else req.user.subscriptions.push(req.project._id);
    await req.user.save();
    await req.user.populate({ path: "subscriptions", select: "appId appName logo media" });
    res.status(200).json(req.user).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
