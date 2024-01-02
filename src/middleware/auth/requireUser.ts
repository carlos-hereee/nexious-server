import msg  from "../../db/data/error.message.json";

module.exports = (req, res, next) => {
  // check if user was found
  const message = msg.userNotFound;
  return req.user ? next() : res.status(404).json(message).end();
};
