const { awsImageUrl } = require("../../../../config.env");
const createPage = require("../../../db/models/page/createPage");
const formatFormData = require("../../../utils/app/format/formatFormData");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");
const { addFile } = require("../../../utils/aws");
const { generateParamFile } = require("../../../utils/aws/awsParams");

module.exports = async (req, res, next) => {
  try {
    let { pageData, refs } = formatFormData(req.body);
    if (req.files) {
      if (req.files.hero) {
        const pageHero = req.files.hero[0];
        const params = generateParamFile(pageHero);
        await addFile(params);
        pageData.hero = awsImageUrl + params.Key;
      }
      if (refs.hasSections) {
        let sections = [];
        for (let item = 0; item < refs.hasSections.length; item++) {
          const sectionHero = req.files.sectionHero[item];
          const current = refs.hasSections[item];
          const params = generateParamFile(sectionHero);
          if (params) {
            await addFile(params);
            sections.push({ ...current, sectionHero: awsImageUrl + params.Key });
          }
        }
        pageData.sections = sections;
      }
    }
    const page = await createPage(pageData);
    req.app.pages.push(page._id);
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add page ");
  }
};
