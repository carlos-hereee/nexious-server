const removeMerch = require("../../db/models/merch/removeMerch");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    const merchId = req.params.merchId;
    await removeMerch({ merchId });
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove merch");
  }
};
