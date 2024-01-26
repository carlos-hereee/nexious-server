import { isDev } from "@appUtils/config.js";
import messages from "@data/error.message.json" assert { type: "json" };
import type { Response } from "express";

export const useGenericErrors = (res: Response, error: unknown, message?: string) => {
  isDev && console.log("error ", message, error);
  res.status(500).json(messages.serverIsDown).end();
};
