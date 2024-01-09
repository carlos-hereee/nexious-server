import type { AppRequestware } from "@app/db";
import { formatFormData } from "@appUtils/format/formatFormData";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateMedias: AppRequestware = async (req, res, next) => {
  try {
    const payload = formatFormData(req.body);
    if (payload) {
      const { pageData, refs } = payload;
      req.apps.media.title = pageData.title;
      req.apps.media.subtitle = pageData.subtitle;
      req.apps.media.hasMedias = pageData.hasMedias;
      req.apps.media.hero = req.asset;
      if (refs.hasMedias) req.apps.media.medias = refs.hasMedias;
      await req.apps.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured updating medias");
  }
};
