import { addFile } from "@aws/index";
import { awsImageUrl } from "@appUtils/config";
import { generateParamFile } from "@aws/awsParams";
import { NextFunction, Response } from "express";
import { FileRequest } from "@app/request";

export const saveAsset = (req: FileRequest, _res: Response, next: NextFunction) => {
  const params = generateParamFile(req.file);
  if (params) {
    // if (!isDev) await addFile(params);
    addFile(params);
    req.asset = awsImageUrl + params.Key;
  }
  next();
};
