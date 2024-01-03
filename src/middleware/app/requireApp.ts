import message from "@data/error.message.json";

export const requireApp = (req, res, next) => {
  req.app ? next() : res.status(404).json(message.appNotFound);
};
