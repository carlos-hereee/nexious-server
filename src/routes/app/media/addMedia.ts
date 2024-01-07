import generateMediaUrl from "../../../utils/app/generateMediaUrl";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const addMedia: MiddlewareProps = async (req, res, next) => {
  try {
    // const
    const mediaData = { ...req.body, url: generateMediaUrl(req.body.media, req.body.link) };
    req.app.media.medias.push(mediaData);
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add media");
  }
};
