import msg from "@data/error.message.json";

export = (req, res, next) => {
  // user must be null else name is taken
  req.user ? res.status(403).json(msg.userAlreadyExist).end() : next();
};
