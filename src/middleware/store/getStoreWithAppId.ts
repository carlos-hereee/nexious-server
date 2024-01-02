const getStore = require("../../db/models/store/getStore");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    req.store = await getStore({ appId: req.app.appId });
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
