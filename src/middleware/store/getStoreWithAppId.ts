import { getStore } from "@db/models/store/getStore";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";
import type { StoreRequest } from "@app/request";

export const getStoreWithAppId = async (req: StoreRequest, res: Response, next: NextFunction) => {
  try {
    // require app
    if (!req.project) return res.status(404).json(message.appNotFound);
    const store = await getStore({ id: req.project.store });
    if (store) req.store = store;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
