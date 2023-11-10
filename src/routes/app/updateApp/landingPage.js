const updateHero = require("../../../db/models/hero/updateHero");
const formatFormData = require("../../../utils/app/format/formatFormData");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");
const formatAssetData = require("../../../utils/app/format/formatAssetData");
const { v4 } = require("uuid");
const getHero = require("../../../db/models/hero/getHero");

module.exports = async (req, res, next) => {
  try {
    if (!req.files) return;
    const { pageData, refs } = formatFormData(req.body);
    let totalHeroes = req.files?.length || 0;
    const callToAction = refs.hasCta?.length || 0;
    const sectionCount = refs.hasSections?.length || 0;
    let ctaIds = [];
    let sectionIds = [];
    let hero;
    if (refs.hasSections) {
      for (let item = 0; item < refs.hasSections.length; item++) {
        const sectionHero = req.files[totalHeroes - sectionCount + item];
        const current = refs.hasSections[item];
        const heroId = current.sharedKey;
        const asset = formatAssetData(sectionHero, { ...current, heroId });
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
    if (refs.hasCta) {
      for (let item = 0; item < refs.hasCta.length; item++) {
        const ctaHero = req.files[totalHeroes - sectionCount - callToAction + item];
        const current = refs.hasCta[item];
        const heroId = current.sharedKey;
        const asset = formatAssetData(ctaHero, { ...current, heroId });
        const hero = await getHero({ heroId });
        if (hero) {
          await updateHero({ heroId }, asset);
          ctaIds.push(hero._id);
        } else {
          const cta = await updateHero({ heroId }, asset);
          ctaIds.push(cta.upsertedId);
        }
      }
    }
    if (totalHeroes === callToAction + sectionCount + 1) {
      const pageHero = req.files[totalHeroes - callToAction - sectionCount - 1];
      const heroId = v4();
      const asset = formatAssetData({ ...pageHero, heroId });
      const landingHero = await updateHero({ heroId }, asset);
      hero = landingHero.upsertedId;
    }
    req.app.landing = { ...pageData, hero, cta: ctaIds, sections: sectionIds };
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured updating lading page");
  }
};
