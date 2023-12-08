const { awsImageUrl } = require("../../../../config.env");
const updatePage = require("../../../db/models/page/updatePage");
const formatFormData = require("../../../utils/app/format/formatFormData");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");
const { addFile } = require("../../../utils/aws");
const { generateParamFile } = require("../../../utils/aws/awsParams");

module.exports = async (req, res, next) => {
  try {
    const pageId = req.params.pageId;
    let { pageData, refs } = formatFormData(req.body);
    if (req.files) {
      if (req.files.hero) {
        const pageHero = req.files.hero[0];
        const params = generateParamFile(pageHero);
        // await addFile(params);
        pageData.hero = awsImageUrl + params.Key;
      }
      if (req.files.sectionHero) {
        let sections = [];
        for (let item = 0; item < refs.hasSections.length; item++) {
          const sectionHero = req.files.sectionHero[item];
          const current = refs.hasSections[item];
          const params = generateParamFile(sectionHero);
          if (params) {
            // await addFile(params);
            sections.push({ ...current, sectionHero: awsImageUrl + params.Key });
          }
        }
        pageData.sections = sections;
      }
    }
    if (refs.hasCta) pageData.cta = refs.hasCta;

    await updatePage({ pageId }, pageData);
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to update page");
  }
};
