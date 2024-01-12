import type { MiddlewareProps } from "@app/express";
import { generateMediaUrl } from "@appUtils/generateMediaUrl";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const addMedia: MiddlewareProps = async (req, res, next) => {
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
