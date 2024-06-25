import { getStore } from "@db/models/store/getStore";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { StoreRequest } from "types/request";

export const getStoreWithStoreId = async (req: StoreRequest, res: Response, next: NextFunction) => {
  try {
    // require app
    const store = await getStore({ storeId: req.params.storeId });
    if (store) req.store = store;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
