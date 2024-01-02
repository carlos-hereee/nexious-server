const getApp = require("../../db/models/app/getApp");

module.exports = async (req, res, next) => {
  const appIds = req.user.ownedApps;
  req.app = await getApp({ appIds });
  next();
};
