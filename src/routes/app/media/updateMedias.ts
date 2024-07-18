import { MediaBody } from "@app/assets";
import type { AppRequest } from "@app/request";
import { generateMediaUrl } from "@utils/app/generateUrl";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateMedias = async (req: AppRequest<MediaBody>, res: Response, next: NextFunction) => {
  try {
    const mediaName = req.body.media.toLowerCase();
    const link = req.body.link;
    const idx = req.project.media.medias.findIndex((m) => m.media.toLowerCase() === mediaName);
    const target = req.project.media.medias[idx];

    if (idx >= 0 && target) {
      const mediaData = { ...target, username: link, url: generateMediaUrl(req.body.media, link), link };
      req.project.media.medias[idx] = mediaData;
      await req.project.save();
    }

    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured updating medias");
  }
};
