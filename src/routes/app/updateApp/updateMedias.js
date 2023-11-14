const saveHeroData = require("../../../middleware/app/saveHeroData");
const formatFormData = require("../../../utils/app/format/formatFormData");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    if (req.file) {
      req.app.media.hero = await saveHeroData(req.file, req.app.media.hero);
    }
    let { pageData, refs } = formatFormData(req.body);
    req.app.media = { ...req.app.media, ...pageData, medias: refs.hasMedias };
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured updating medias");
  }
};
