import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { StoreRequest } from "types/request";
import { getMerch } from "@db/models/merch/getMerch";
import message from "@db/data/error.message.json";

export const getMerchWithId = async (req: StoreRequest, res: Response, next: NextFunction) => {
  try {
    // require app
    const merch = await getMerch({ merchId: req.params.merchId });
    if (!merch) return res.status(404).json(message.merchNotFound).end();
    req.merch = merch;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
