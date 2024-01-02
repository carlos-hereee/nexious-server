import { isDev }  from "../../../config.env";
import messages  from "../../db/data/error.message.json";

module.exports = (res, error, message) => {
  isDev && console.log("error ", message, error);
  res.status(500).json(messages.serverIsDown).end();
};
