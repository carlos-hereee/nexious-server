const useGenericErrors = require("../../utils/auth/useGenericErrors");
const message = require("../../db/data/error.message.json");

module.exports = async (req, res, next) => {
  try {
    req.store ? next() : res.status(404).json(message.storeNotFound);
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
