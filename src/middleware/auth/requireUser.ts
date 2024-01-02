import msg  from "@data/error.message.json";

export  (req, res, next) => {
  // check if user was found
  const message = msg.userNotFound;
  return req.user ? next() : res.status(404).json(message).end();
};
