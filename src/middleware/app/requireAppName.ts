const message = require("../../db/data/error.message.json");

module.exports = (req, res, next) => {
  const appName = req.body.appName || req.params.appName;
  // appName must exists
  if (!appName) return res.status(400).json(message.missingCredentials).end();
  next();
};
