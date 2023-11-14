const { v4 } = require("uuid");
const formatAssetData = require("../../utils/app/format/formatAssetData");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (heroData, heroId) => {
  try {
    if (heroId) {
      const asset = formatAssetData({ ...heroData, heroId });
      return await updateHero({ heroId }, asset);
    } else {
      heroId = v4();
      const asset = formatAssetData({ ...heroData }, heroId);
      return await updateHero({ heroId }, asset);
    }
  } catch (error) {
    useGenericErrors(res, error, "unable to update hero data");
  }
};
