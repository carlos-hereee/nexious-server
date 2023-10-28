const { isDev } = require("../../../config.env");
const messages = require("../../db/data/error.message.json");

module.exports = (res, error, message) => {
  isDev && console.log("error ", message, error);
  res.status(500).json(messages.serverIsDown).end();
};
