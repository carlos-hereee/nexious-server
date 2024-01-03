import getUserAuth from "@dbModels/users/getUserAuth";
import msg from "@data/error.message.json";

export const validateUser = (req, res, next) => {
  const username = req.body.username || req.params.username;
  // must have a value
  if (!username) {
    return res.status(400).json(msg.missingCredentials).end();
  }
  req.user = await getUserAuth({ username });
  next();
};
