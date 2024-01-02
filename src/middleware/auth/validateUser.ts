import getUserAuth  from "../../db/models/users/getUserAuth";
import msg  from "../../db/data/error.message.json";

module.exports = async (req, res, next) => {
  const username = req.body.username || req.params.username;
  // must have a value
  if (!username) {
    return res.status(400).json(msg.missingCredentials).end();
  }
  req.user = await getUserAuth({ username });
  next();
};
