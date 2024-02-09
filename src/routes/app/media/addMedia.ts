import { generateMediaUrl } from "@appUtils/generateMediaUrl";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const addMedia: RequestHandler = async (req, res, next) => {
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
