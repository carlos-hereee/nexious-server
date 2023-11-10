// const { v4 } = require("uuid");
const updateHero = require("../../../db/models/hero/updateHero");
const formatFormData = require("../../../utils/app/format/formatFormData");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    const { pageData, refs } = formatFormData(req.body);
    let ctaIds = [];
    let sectionIds = [];
    if (refs.cta) {
      for (let item = 0; item < refs.cta.length; item++) {
        const current = refs.cta[item];
        const cta = await updateHero({ heroId: current.sharedKey }, current);
        ctaIds.push(cta.upsertedId);
      }
    }
    if (refs.sections) {
      for (let item = 0; item < refs.sections.length; item++) {
        const current = refs.sections[item];
        const section = await updateHero({ heroId: current.sharedKey }, current);
        // await req.app.landing.sections.push(section.upsertedId)
        sectionIds.push(section.upsertedId);
        // console.log("current :>> ", current);
      }
    }
    req.app.landing = { ...pageData, cta: ctaIds, sections: sectionIds };
    await req.app.save();
    res.status(200).json(req.app).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured updating lading page");
  }
};
