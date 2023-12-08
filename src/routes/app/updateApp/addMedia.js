const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    req.app.media.medias.push(req.body);
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add media");
  }
};
