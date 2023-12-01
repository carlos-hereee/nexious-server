const formatFormData = require("../../../utils/app/format/formatFormData");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");
const { awsImageUrl } = require("../../../../config.env");
const { generateParamFile } = require("../../../utils/aws/awsParams");
const { addFile } = require("../../../utils/aws");

module.exports = async (req, res, next) => {
  try {
    let { pageData, refs } = formatFormData(req.body);
    req.app.landing = pageData;
    if (req.files) {
      if (req.files.hero) {
        const pageHero = req.files.hero[0];
        const params = generateParamFile(pageHero);
        await addFile(params);
        req.app.landing.hero = awsImageUrl + params.Key;
      }
      if (refs.hasSections) {
        let sections = [];
        for (let item = 0; item < refs.hasSections.length; item++) {
          const sectionHero = req.files.sectionHero[item];
          const current = refs.hasSections[item];
          const params = generateParamFile(sectionHero);
          await addFile(params);
          sections.push({ ...current, sectionHero: awsImageUrl + params.Key });
        }
        req.app.landing.sections = sections;
      }
    }
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured updating lading page");
  }
};
