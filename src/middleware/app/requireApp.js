const msg = require("../../db/data/error.message.json");

module.exports = async (req, res, next) => {
  req.app ? next() : res.status(204).json(msg.appNotFound);
};
