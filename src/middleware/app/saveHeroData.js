const { v4 } = require("uuid");
const formatAssetData = require("../../utils/app/format/formatAssetData");
const updateHero = require("../../db/models/hero/updateHero");
const saveHero = require("../../db/models/hero/saveHero");
const isDefined = require("../../utils/app/isDefined");

module.exports = async (heroData, heroId) => {
  if (isDefined(heroId)) {
    const asset = formatAssetData(heroData, heroId);
    const hero = await updateHero({ refId: heroId }, asset);
    return hero.upsertedId;
  } else {
    const asset = formatAssetData(heroData, { heroId: v4() });
    const hero = await saveHero(asset);
    return hero._id;
  }
};
