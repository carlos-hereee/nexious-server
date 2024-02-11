import { AppBody } from "@app/app";
import { AppRequest } from "@app/request";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const requireAppName = (req: AppRequest<AppBody>, res: Response, next: NextFunction) => {
  const appName = req.body.appName || req.params.appName;
  // appName must exists
  if (!appName) return res.status(400).json(message.missingCredentials).end();
  next();
};
