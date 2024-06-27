import { NextFunction, Response } from "express";
import type { FileRequest } from "@app/request";
import { saveFile } from "@utils/aws";
import { isDev } from "@utils/app/config";

export const saveAsset = (req: FileRequest, _res: Response, next: NextFunction) => {
  if (isDev) return next();
  if (req.file) req.asset = saveFile(req.file);
  next();
};
