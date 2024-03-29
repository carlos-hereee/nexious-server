import { MediaBody } from "@app/assets";
import { AppRequest } from "@app/request";
import { generateMediaUrl } from "@utils/app/generateMediaUrl";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const addMedia = async (req: AppRequest<MediaBody>, res: Response, next: NextFunction) => {
  try {
    // const
    const mediaData = { ...req.body, url: generateMediaUrl(req.body.media, req.body.link) };
    req.project.media.medias.push(mediaData);
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add media");
  }
};
