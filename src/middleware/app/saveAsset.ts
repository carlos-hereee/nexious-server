import { addFile } from "@utils/aws/index";
import { awsImageUrl } from "@utils/app/config";
import { generateParamFile } from "@utils/aws/awsParams";
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
