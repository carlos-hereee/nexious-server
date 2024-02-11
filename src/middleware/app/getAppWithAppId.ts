import { getApp } from "@db/models/app/getApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { AppRequest } from "@app/request";
import { AppBody } from "@app/app";

export const getAppWithAppId = async (req: AppRequest<AppBody>, res: Response, next: NextFunction) => {
  try {
    const app = await getApp({ appId: req.params.appId });
    if (app) req.myApp = app;
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to find app with app id ");
  }
};
