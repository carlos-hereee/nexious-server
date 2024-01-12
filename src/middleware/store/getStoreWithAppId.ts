import { getStore } from "@dbModels/store/getStore";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import message from "@data/error.message.json";
// import type { MiddlewareProps } from "@app/express";
// import type { RequestHandler } from "express";
import type { StoreRequestWare } from "@app/express";

export const getStoreWithAppId: StoreRequestWare = async (req, res, next) => {
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
