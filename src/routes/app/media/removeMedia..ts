import type { MiddlewareProps } from "@app/db";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const removeMedia: MiddlewareProps = async (req, res, next) => {
  try {
    const { assetId } = req.params;
    req.apps.media.medias = req.apps.media.medias.filter((m) => m.uid !== assetId);
    await req.apps.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove media");
  }
};
