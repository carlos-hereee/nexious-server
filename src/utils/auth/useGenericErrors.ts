import { isDev } from "@config";
import messages from "@data/error.message.json";
import type { GenericErrorProps } from "app-types";

export const useGenericErrors: GenericErrorProps = (res, error, message) => {
  isDev && console.log("error ", message, error);
  res.status(500).json(messages.serverIsDown).end();
};
