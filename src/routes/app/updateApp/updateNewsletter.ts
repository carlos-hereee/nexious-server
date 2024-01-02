const formatFormData = require("../../../utils/app/format/formatFormData");

module.exports = async (req, res, next) => {
  try {
    let { pageData } = formatFormData(req.body);
    req.app.newsletter = { ...pageData, hero: req.asset };
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured upating newsletter");
  }
};
