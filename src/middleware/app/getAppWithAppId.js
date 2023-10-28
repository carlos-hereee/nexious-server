const getApp = require("../../db/models/app/getApp");

module.exports = async (req, res, next) => {
  const appId = req.params.appId;
  req.app = await getApp({ appId });
  next();
};
