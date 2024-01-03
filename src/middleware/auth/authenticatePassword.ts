import msg from "@data/error.message.json";
import generateHash from "../../utils/auth/generateHash";

export const authenticatePassword = (req, res, next) => {
  // key variable
  const password = req.body.password || req.body.oldPassword;
  // use previous salt with password regenerate hash password
  const expectedHash = generateHash(req.user.auth.salt, password);
  // validate password
  if (expectedHash === req.user.auth.password) {
    next();
  } else {
    const message = msg.invalidCredentails;
    res.status(403).json(message).end();
  }
};
