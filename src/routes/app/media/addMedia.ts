import { MediaBody } from "@app/assets";
import type { AppRequest } from "@app/request";
import { generateMediaUrl } from "@utils/app/generateUrl";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const addMedia = async (req: AppRequest<MediaBody>, res: Response, next: NextFunction) => {
  try {
    const link = req.body.link;

    const mediaData = { ...req.body, username: link, url: generateMediaUrl(req.body.media, link), link };
    req.project.media.medias.push(mediaData);
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add media");
  }
};
