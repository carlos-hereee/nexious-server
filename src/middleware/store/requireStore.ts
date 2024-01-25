import type { RequestHandler } from "express";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import message from "@data/error.message.json";

export const requireStore: RequestHandler = (req, res, next) => {
  try {
    req.store ? next() : res.status(404).json(message.storeNotFound);
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
