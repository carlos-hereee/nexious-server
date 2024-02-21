import { MediaBody } from "@app/assets";
import { AppUpdateRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const removeMedia = async (req: AppUpdateRequest<MediaBody>, res: Response, next: NextFunction) => {
  try {
    const { assetId } = req.params;
    req.project.media.medias = req.project.media.medias.filter((m) => m.uid !== assetId);
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove media");
  }
};
