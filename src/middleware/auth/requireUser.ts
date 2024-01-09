import type { UserRequestware } from "@app/db";
import message from "@data/error.message.json";

export const requireUser: UserRequestware = (req, res, next) => {
  // check if user was found
  if (req.user) next();
  else {
    res.status(404).json(message.userNotFound).end();
  }
};
