import { AppRequest } from "types/request";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const requireAppName = (req: AppRequest, res: Response, next: NextFunction) => {
  const appName = req.body.appName || req.params.appName;
  // appName must exists
  if (!appName) return res.status(400).json(message.missingCredentials).end();
  next();
};
