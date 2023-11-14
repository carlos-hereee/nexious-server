const formatFormData = require("../../../utils/app/format/formatFormData");
const saveHeroData = require("../../../middleware/app/saveHeroData");

module.exports = async (req, res, next) => {
  try {
    if (req.file) {
      req.app.newsletter.hero = await saveHeroData(req.file, req.app.newsletter.hero);
    }
    let { pageData } = formatFormData(req.body);
    req.app.newsletter = { ...req.app.newsletter, ...pageData };
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured upating newsletter");
  }
};
