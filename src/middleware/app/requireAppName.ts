import type { RequestHandler } from "express";
import message from "@data/error.message.json" assert { type: "json" };

export const requireAppName: RequestHandler = (req, res, next) => {
  const appName = req.body.appName || req.params.appName;
  // appName must exists
  if (!appName) return res.status(400).json(message.missingCredentials).end();
  next();
};
