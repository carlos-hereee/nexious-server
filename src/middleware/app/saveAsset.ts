import { NextFunction, Response } from "express";
import { FileRequest } from "types/request";
import { saveFile } from "@utils/aws";

export const saveAsset = (req: FileRequest, _res: Response, next: NextFunction) => {
  if (req.file) req.asset = saveFile(req.file);
  next();
};
