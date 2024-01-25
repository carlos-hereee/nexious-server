import { getStore } from "@dbModels/store/getStore.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import message from "@data/error.message.json";
import type { RequestHandler } from "express";

export const getStoreWithAppId: RequestHandler = async (req, res, next) => {
  try {
    // require app
    if (req.myApp) {
      req.store = await getStore({ appId: req.myApp.appId });
      next();
    } else res.status(404).json(message.appNotFound);
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
