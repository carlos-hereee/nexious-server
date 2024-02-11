// import { AppBody } from "@app/app";
import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const subscribe = async (req: AppRequest<null>, res: Response, next: NextFunction) => {
  try {
    req.user.subscriptions.push(req.myApp._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
