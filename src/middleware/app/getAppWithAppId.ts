import { getApp } from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Response } from "express";
import { AppRequest } from "@app/request";

export const getAppWithAppId = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const app = await getApp({ appId: req.params.appId });
    if (app) req.myApp = app;
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to find app with app id ");
  }
};
