const messages = require("../../db/data/error.message.json");

module.exports = async (req, res, next) => {
  const appId = req.params.appId || req.body.appId;
  const isMatch = req.user.ownedApps.filter((data) => data.appId === appId);
  isMatch ? next() : res.status(400).json(messages.unauthorizedUser);
};
