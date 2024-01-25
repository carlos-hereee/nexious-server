import { getApp } from "@dbModels/app/getApp.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import type { RequestHandler } from "express";

export const getAppWithAppId: RequestHandler = async (req, res, next) => {
  try {
    if (req.params.appId) {
      req.myApp = await getApp({ appId: req.params.appId });
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to find app with app id ");
  }
};
