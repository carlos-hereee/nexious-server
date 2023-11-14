const updateHero = require("../../../db/models/hero/updateHero");
const formatFormData = require("../../../utils/app/format/formatFormData");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");
const formatAssetData = require("../../../utils/app/format/formatAssetData");
const { v4 } = require("uuid");
const getHero = require("../../../db/models/hero/getHero");

module.exports = async (req, res, next) => {
  try {
    if (!req.files) return;
    let { pageData, refs } = formatFormData(req.body);
    let sectionIds = [];
    let hero;
    if (refs.hasSections) {
      for (let item = 0; item < refs.hasSections.length; item++) {
        const sectionHero = req.files.sectionHero[item];
        const current = refs.hasSections[item];
        const heroId = current.sharedKey;
        const asset = formatAssetData(sectionHero, { ...current, heroId });
        // check if new
        let hero = await getHero({ heroId });
        if (hero) {
          await updateHero({ heroId }, asset);
          sectionIds.push(hero._id);
        } else {
          const section = await updateHero({ heroId }, asset);
          sectionIds.push(section.upsertedId);
        }
      }
    }
    if (refs.hasCta) pageData = { ...pageData, cta: refs.hasCta };
    if (req.files.hero) {
      const pageHero = req.files.hero[0];
      if (req.app.landing.hero) {
        const heroId = req.app.landing.hero.heroId;
        const asset = formatAssetData({ ...pageHero, heroId });
        // check if new
        const landingHero = await updateHero({ heroId }, asset);
        hero = landingHero.upsertedId;
      } else {
        const heroId = v4();
        const asset = formatAssetData({ ...pageHero, heroId });
        // check if new
        const landingHero = await updateHero({ heroId }, asset);
        hero = landingHero.upsertedId;
      }
    }
    req.app.landing = { ...pageData, hero, sections: sectionIds };
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured updating lading page");
  }
};
