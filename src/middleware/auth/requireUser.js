const msg = require("../../db/data/error.message.json");

module.exports = (req, res, next) => {
  // check if user was found
  const message = msg.unauthorizedUser;
  return req.user ? next() : res.status(400).json(message).end();
};
