import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const removeMedia = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const { assetId } = req.params;
    req.myApp.media.medias = req.myApp.media.medias.filter((m) => m.uid !== assetId);
    await req.myApp.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove media");
  }
};
