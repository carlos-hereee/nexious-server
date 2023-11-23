const useGenericErrors = require("../../utils/auth/useGenericErrors");
// const formatLogoData = require("../../utils/app/format/formatLogoData");
// const updateHero = require("../../db/models/hero/updateHero");
const saveHeroData = require("./saveHeroData");

module.exports = async (req, res, next) => {
  try {
    // key variables
    if (req.file) {
      const hero = await saveHeroData(req.file, req.app.heroId);
      req.app.logo = hero;
      await req.app.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "error updating logo and appname");
  }
};
