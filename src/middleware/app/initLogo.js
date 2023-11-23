const useGenericErrors = require("../../utils/auth/useGenericErrors");
const saveHeroData = require("./saveHeroData");

module.exports = async (req, res, next) => {
  try {
    if (req.file) {
      const hero = await saveHeroData(req.file, undefined);
      req.logo = hero;
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to create logo");
  }
};
