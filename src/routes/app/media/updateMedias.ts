import formatFormData from "../../../utils/app/format/formatFormData";
import useGenericErrors from "../../../utils/auth/useGenericErrors";

export = async (req, res, next) => {
  try {
    let { pageData, refs } = formatFormData(req.body);
    req.app.media = { ...pageData, medias: refs.hasMedias || [], hero: req.asset };
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured updating medias");
  }
};
