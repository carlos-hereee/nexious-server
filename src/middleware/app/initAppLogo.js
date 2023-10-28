const { v4 } = require("uuid");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const formatLogoData = require("../../utils/app/formatLogoData");
const updateHero = require("../../db/models/hero/updateHero");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const appName = req.body.appName || req.params.appName;
    const heroId = v4();
    // declare logo data
    const logo = formatLogoData(appName, req.file);
    const id = await updateHero({ heroId }, { ...logo, heroId });
    req.logoId = id;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error updating logo and appname");
  }
};
