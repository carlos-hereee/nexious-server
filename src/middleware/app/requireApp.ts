import message  from "../../db/data/error.message.json";

module.exports = async (req, res, next) => {
  req.app ? next() : res.status(404).json(message.appNotFound);
};
