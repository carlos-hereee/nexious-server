import { AppUpdateRequest } from "@app/request";
import { generateMediaUrl } from "@appUtils/generateMediaUrl";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Response } from "express";

export const addMedia = async (req: AppUpdateRequest, res: Response, next: NextFunction) => {
  try {
    // const
    const mediaData = { ...req.body, url: generateMediaUrl(req.body.media, req.body.link) };
    req.myApp.media.medias.push(mediaData);
    await req.myApp.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add media");
  }
};
