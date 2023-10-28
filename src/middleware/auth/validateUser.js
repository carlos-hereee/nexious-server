const getUserAuth = require("../../db/models/users/getUserAuth");
const msg = require("../../db/data/error.message.json");

module.exports = async (req, res, next) => {
  /**
   * body shema { username: {value: "qwerty", name: "username"} }
   */
  const username = req.body.username || req.params.username;
  // must have a value
  if (!username) {
    return res.status(400).json(msg.missingCredentials).end();
  }
  req.user = await getUserAuth({ username });
  next();
};
