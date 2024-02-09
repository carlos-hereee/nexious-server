import { formatFormData } from "@appUtils/format/formatFormData";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Request, Response } from "express";

export const updateMedias = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.myApp) {
      const payload = formatFormData(req.body);
      if (payload) {
        const { pageData, refs } = payload;
        req.myApp.media.title = pageData.title;
        req.myApp.media.subtitle = pageData.subtitle;
        req.myApp.media.hasMedias = pageData.hasMedias;
        req.myApp.media.hero = req.asset || "";
        if (refs.hasMedias) req.myApp.media.medias = refs.hasMedias;
        await req.myApp.save();
      }
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured updating medias");
  }
};
