// const getHero = require("../../db/models/hero/getHero");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const saveHeroData = require("./saveHeroData");

module.exports = async (req, res, next) => {
  try {
    if (req.file) {
      // console.log("req.file :>> ", req.file);
      const hero = await saveHeroData(req.file, undefined);
      // console.log("hero :>> ", hero);
      // const heroData = await getHero({ uid: hero });
      // console.log("heroData :>> ", heroData);
      req.logo = hero;
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to create logo");
  }
};
