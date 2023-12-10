const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const { name, body, quantity, cost } = req.body;
    const hero = req.asset;
    req.app.store.merchendise.push({ hero, name, quantity, cost, body });
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
