import { AppRequest } from "types/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import message from "@db/data/error.message.json";
import { getApp } from "@db/models/app/getApp";
import { NextFunction, Response } from "express";

export const requireUniqueName = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const appName = req.body.appName || req.params.appName;
    const app = await getApp({ appName });
    // if app name is taken
    if (app) return res.status(400).json(message.appNameTaken).end();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured fetching appname data data");
  }
};
