const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    req.user.subscriptions.push(req.app._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
