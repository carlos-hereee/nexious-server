import message from "@data/error.message.json";
import getUser from "@dbModels/users/getUser";

export const requireUsername = async (req, res, next) => {
  const username = req.body.username || req.params.username;
  // must have a value
  if (!username) {
    return res.status(400).json(message.missingCredentials).end();
  }
  req.user = await getUser({ username });
  next();
};
