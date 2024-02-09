import { getStore } from "@dbModels/store/getStore";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import message from "@data/error.message.json";
import { NextFunction, Response } from "express";
import { StoreRequest } from "@app/request";

export const getStoreWithAppId = async (req: StoreRequest, res: Response, next: NextFunction) => {
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
