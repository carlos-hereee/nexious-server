import { StoreRequest } from "@app/request";
import { StoreSessionBody } from "@app/store";
import { NextFunction, Response } from "express";
import message from "@db/data/error.message.json";
import { useGenericErrors } from "@utils/auth/useGenericErrors";

export const requireClientData = (req: StoreRequest<StoreSessionBody>, res: Response, next: NextFunction) => {
  try {
    // require app
    const { client } = req.body;

    // require param data
    if (!client || !client.email || !client.phone) return res.status(400).json(message.missingClientData).end();
    if (!req.store || !req.store.storeId) return res.status(404).json(message.storeNotFound).end();

    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
