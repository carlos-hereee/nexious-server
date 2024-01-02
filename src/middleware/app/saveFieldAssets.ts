const { awsImageUrl } = require("../../../config.env");
const saveFile = require("../../utils/app/saveFile");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const { addFile } = require("../../utils/aws");
const { generateParamFiles } = require("../../utils/aws/awsParams");

module.exports = async (req, res, next) => {
  try {
    req.asset = { hero: "", sectionHero: [] };
    // check if files exists
    if (req.files) {
      // save landing hero if exists
      if (req.files.hero?.length > 0) {
        const url = await saveFile(req.files.hero[0]);
        req.asset.hero = url;
      }
      // save sectionHero if exists
      if (req.files.sectionHero?.length > 0) {
        // generate params first
        const params = generateParamFiles(req.files.sectionHero);
        // save file
        params.forEach(async (param) => await addFile(param));
        // while files are being added to bucket format urls
        req.asset.sectionHero = params.map((p) => awsImageUrl + p.Key);
      }
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save field assets");
  }
};
