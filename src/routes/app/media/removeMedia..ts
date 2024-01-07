import {useGenericErrors } from "../../../utils/auth/useGenericErrors";

export const removeMedia. = async (req, res, next) => {
  try {
    const { assetId } = req.params;
    req.app.media.medias = req.app.media.medias.filter((m) => m.uid !== assetId);
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove media");
  }
};