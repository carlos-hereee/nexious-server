import type { MiddlewareProps } from "@app/db";
import { formatFormData } from "@appUtils/format/formatFormData";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateMedias: MiddlewareProps = async (req, res, next) => {
  try {
    const payload = formatFormData(req.body);
    if (payload) {
      const { pageData, refs } = payload;
      req.app.media.title = pageData.title;
      req.app.media.subtitle = pageData.subtitle;
      req.app.media.hasMedias = pageData.hasMedias;
      req.app.media.hero = req.asset || "";
      if (refs.hasMedias) req.app.media.medias = refs.hasMedias;
      await req.app.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured updating medias");
  }
};
