import type { MiddlewareProps } from "@app/db";
import message from "@data/error.message.json";

export const requireAppName: MiddlewareProps = (req, res, next) => {
  const appName = req.body.appName || req.params.appName;
  // appName must exists
  if (!appName) return res.status(400).json(message.missingCredentials).end();
  next();
};
