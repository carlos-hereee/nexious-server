import { MediaBody } from "types/assets";
import { AppRequest } from "types/request";
import { generateMediaUrl } from "@utils/app/generateUrl";
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
