import type { MiddlewareProps } from "@app/express";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const removeMedia: MiddlewareProps = async (req, res, next) => {
  try {
    const { assetId } = req.params;
    req.myApp.media.medias = req.myApp.media.medias.filter((m) => m.uid !== assetId);
    await req.myApp.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove media");
  }
};
