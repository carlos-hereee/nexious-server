import { MediaBody } from "@app/assets";
import type { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const removeMedia = async (req: AppRequest<MediaBody>, res: Response, next: NextFunction) => {
  try {
    const { assetId } = req.params;
    // remove unwanted data
    req.project.media.medias = req.project.media.medias.filter((m) => m.uid !== assetId);
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove media");
  }
};
