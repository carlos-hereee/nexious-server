import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const subscribe = async (req: AppRequest, res: Response) => {
  try {
    req.user.subscriptions.push(req.project._id);
    await req.user.save();
    res.status(200).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
