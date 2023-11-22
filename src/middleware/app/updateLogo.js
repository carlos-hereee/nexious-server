const useGenericErrors = require("../../utils/auth/useGenericErrors");
const formatLogoData = require("../../utils/app/format/formatLogoData");
const updateHero = require("../../db/models/hero/updateHero");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const appName = req.body.appName || req.params.appName;
    const heroId = req.app.logo;
    // declare logo data
    const logo = formatLogoData(appName, req.file);
    const hero = await updateHero({ refId: heroId }, logo);
    req.app.logo = hero._id || hero.upsertedId;
    await rea.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error updating logo and appname");
  }
};
