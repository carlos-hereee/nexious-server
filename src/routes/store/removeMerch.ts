import { removeMerch } from "@dbModels/merch/removeMerch";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Request, Response } from "express";

export const removeMerchendise = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const merchId = req.params.merchId;
    await removeMerch({ merchId });
    // TODO: REMOVE MERCH ON STRIPE
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove merch");
  }
};
