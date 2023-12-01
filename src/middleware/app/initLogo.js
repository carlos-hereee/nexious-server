// const getHero = require("../../db/models/hero/getHero");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const { addFile } = require("../../utils/aws");
const { generateParamFile } = require("../../utils/aws/awsParams");
// const saveHeroData = require("./saveHeroData");

module.exports = async (req, res, next) => {
  try {
    if (req.file) {
      // console.log("req.file :>> ", req.file);
      const params = generateParamFile(req.file);
      const result = await addFile(params);
      console.log("fileData :>> ", params);
      console.log("fileData :>> ", result);
      // console.log("req.file :>> ", req.file);
      // const hero = await saveHeroData(req.file, undefined);
      // // console.log("hero :>> ", hero);
      // // const heroData = await getHero({ uid: hero });
      // // console.log("heroData :>> ", heroData);
      // req.logo = hero;
    }
    return;
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to create logo");
  }
};
