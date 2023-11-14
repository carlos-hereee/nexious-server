const { v4 } = require("uuid");
const formatAssetData = require("../../utils/app/format/formatAssetData");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const updateHero = require("../../db/models/hero/updateHero");
const saveHero = require("../../db/models/hero/saveHero");

module.exports = async (heroData, heroId) => {
  try {
    if (heroId) {
      const asset = formatAssetData(heroData, heroId);
      const hero = await updateHero({ refId: heroId }, asset);
      return hero.upsertedId;
    } else {
      const asset = formatAssetData(heroData, v4());
      const hero = await saveHero(asset);
      return hero._id;
    }
  } catch (error) {
    useGenericErrors(res, error, "unable to update hero data");
  }
};
