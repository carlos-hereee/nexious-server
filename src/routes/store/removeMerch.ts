import { removeMerch } from "@dbModels/merch/removeMerch.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import type { RequestHandler } from "express";

export const removeMerchendise: RequestHandler = async (req, res, next) => {
  try {
    const merchId = req.params.merchId;
    await removeMerch({ merchId });
    // TODO: REMOVE MERCH ON STRIPE
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove merch");
  }
};
