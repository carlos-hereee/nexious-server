import { isDev } from "@config";
import messages from "@data/error.message.json";
import type { Response } from "express";

export const useGenericErrors = (res: Response, error: unknown, message?: string) => {
  isDev && console.log("error ", message, error);
  res.status(500).json(messages.serverIsDown).end();
};
