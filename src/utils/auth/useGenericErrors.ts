import { isDev } from "@config";
import messages from "@data/error.message.json";

export const useGenericErrors = (res, error, message) => {
  isDev && console.log("error ", message, error);
  res.status(500).json(messages.serverIsDown).end();
};
