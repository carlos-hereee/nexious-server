const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    let { pageData, refs } = formatFormData(req.body);
    // console.log("req.params :>> ", req.params);
    if (req.files) {
      if (req.files.hero) {
        const pageHero = req.files.hero[0];
        const params = generateParamFile(pageHero);
        // await addFile(params);
        pageData.hero = awsImageUrl + params.Key;
      }
      if (refs.hasSections) {
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
    console.log("pageData :>> ", pageData);
  } catch (error) {
    useGenericErrors(res, error, "unable to update page");
  }
};
