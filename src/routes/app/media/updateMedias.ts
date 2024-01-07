import type { MiddlewareProps } from "@app/app";
import { formatFormData } from "@appUtils/format/formatFormData";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateMedias: MiddlewareProps = async (req, res, next) => {
  try {
    const payload = formatFormData(req.body);
    if (payload) {
      const { pageData, refs } = payload;
      // if()
      req.app.media = { ...pageData, medias: refs.hasMedias || [], hero: req.asset };
      await req.app.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured updating medias");
  }
};
