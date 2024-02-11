import { AppRequest } from "@app/request";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import message from "@data/error.message.json";
import { getApp } from "@dbModels/app/getApp";
import { NextFunction, Response } from "express";

export const requireUniqueName = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const appName = req.body.appName || req.params.appName;
    const app = await getApp({ appName });
    // if app name is taken
    if (app) res.status(400).json(message.appNameTaken).end();
    else next();
  } catch (error) {
    useGenericErrors(res, error, "error occured fetching appname data data");
  }
};
