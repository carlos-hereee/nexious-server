const { v4 } = require("uuid");
const formatAssetData = require("../../../utils/app/format/formatAssetData");
const updateHero = require("../../../db/models/hero/updateHero");
const formatFormData = require("../../../utils/app/format/formatFormData");

module.exports = async (req, res, next) => {
  try {
    if (req.file) {
      let heroId = req.app.newsletter.hero;
      const heroData = req.file;
      if (heroId) {
        const asset = formatAssetData({ ...heroData, heroId });
        const newsletterHero = await updateHero({ heroId }, asset);
        req.app.newsletter.hero = newsletterHero.upsertedId;
      } else {
        heroId = v4();
        const asset = formatAssetData({ ...heroData, heroId });
        const newsletterHero = await updateHero({ heroId }, asset);
        req.app.newsletter.hero = newsletterHero.upsertedId;
      }
    }
    let { pageData } = formatFormData(req.body);
    req.app.newsletter = { ...req.app.newsletter, ...pageData };
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured upating newsletter");
  }
};
