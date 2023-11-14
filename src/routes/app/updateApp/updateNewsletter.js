const formatFormData = require("../../../utils/app/format/formatFormData");
const saveHeroData = require("../../../middleware/app/saveHeroData");

module.exports = async (req, res, next) => {
  try {
    if (req.file) {
      let heroId = req.app.newsletter.hero;
      const newsletterHero = await saveHeroData({ heroData: req.file, heroId });
      req.app.newsletter.hero = newsletterHero.upsertedId;
    }
    let { pageData } = formatFormData(req.body);
    req.app.newsletter = { ...req.app.newsletter, ...pageData };
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured upating newsletter");
  }
};