import message from "@data/error.message.json";

export const requireUser = (req, res, next) => {
  // check if user was found
  return req.user ? next() : res.status(404).json(message.userNotFound).end();
};
