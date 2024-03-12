import { getStore } from "@db/models/store/getStore";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";
import { StoreRequest } from "@app/request";

export const getStoreWithAppId = async (req: StoreRequest<null>, res: Response, next: NextFunction) => {
  try {
    // require app
    if (req.project) {
      const store = await getStore({ appId: req.project.appId });
      if (store) req.store = store;
      next();
    } else res.status(404).json(message.appNotFound);
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
