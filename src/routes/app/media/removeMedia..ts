import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import type { RequestHandler } from "express";

export const removeMedia: RequestHandler = async (req, res, next) => {
  try {
    if (req.myApp) {
      const { assetId } = req.params;
      req.myApp.media.medias = req.myApp.media.medias.filter((m) => m.uid !== assetId);
      await req.myApp.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove media");
  }
};
