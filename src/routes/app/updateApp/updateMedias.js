const saveHeroData = require("../../../middleware/app/saveHeroData");
const formatFormData = require("../../../utils/app/format/formatFormData");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    if (req.file) {
      let heroId = req.app.media.hero;
      req.app.media.hero = await saveHeroData({ heroData: req.file, heroId });
    }
    let { pageData } = formatFormData(req.body);
    req.app.media = { ...req.app.media, ...pageData };
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured updating medias");
  }
};
