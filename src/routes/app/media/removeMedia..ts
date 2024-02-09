import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Request, Response } from "express";

export const removeMedia = async (req: Request, res: Response, next: NextFunction) => {
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
