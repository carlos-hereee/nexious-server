import { getApp } from "@db/models/app/getApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import type { AppRequest } from "@app/request";

export const getAppWithAppId = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const app = await getApp({ appId: req.params.appId });
    if (app) req.project = app;
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to find app with app id ");
  }
};
