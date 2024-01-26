import type { RequestHandler } from "express";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import message from "@data/error.message.json" assert { type: "json" };
import { getApp } from "@dbModels/app/getApp.js";

export const requireUniqueName: RequestHandler = async (req, res, next) => {
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
