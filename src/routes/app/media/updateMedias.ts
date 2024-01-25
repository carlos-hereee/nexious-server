import type { RequestHandler } from "express";
import { formatFormData } from "@appUtils/format/formatFormData.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";

export const updateMedias: RequestHandler = async (req, res, next) => {
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
