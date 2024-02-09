import { generateMediaUrl } from "@appUtils/generateMediaUrl";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Request, Response } from "express";

export const addMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.myApp) {
      // const
      const mediaData = { ...req.body, url: generateMediaUrl(req.body.media, req.body.link) };
      req.myApp.media.medias.push(mediaData);
      await req.myApp.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add media");
  }
};
