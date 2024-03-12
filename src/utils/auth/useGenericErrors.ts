import { isDev } from "@utils/app/config";
import messages from "@db/data/error.message.json";
import type { Response } from "express";

export const useGenericErrors = (res: Response, error: unknown, message?: string) => {
  isDev && console.log("error ", message, error);
  return res.status(500).json(messages.serverIsDown).end();
};
