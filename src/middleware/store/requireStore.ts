import { StoreRequest } from "types/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";
import { StoreBody } from "types/store";

export const requireStore = (req: StoreRequest<StoreBody>, res: Response, next: NextFunction) => {
  try {
    req.store ? next() : res.status(404).json(message.storeNotFound);
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
