import getUserAuth from "@dbModels/users/getUserAuth";
import message from "@data/error.message.json";

export const validateUser = async (req, res, next) => {
  const username = req.body.username || req.params.username;
  // must have a value
  if (!username) {
    return res.status(400).json(message.missingCredentials).end();
  }
  req.user = await getUserAuth({ username });
  next();
};
