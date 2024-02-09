import { useGenericErrors } from "@authUtils/useGenericErrors";
import { addFile } from "@aws/index";
import { awsImageUrl } from "@appUtils/config";
import { generateParamFile } from "@aws/awsParams";
import { NextFunction, Request, Response } from "express";

export const saveAsset = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file) {
      const params = generateParamFile(req.file);
      if (params) {
        // if (!isDev) await addFile(params);
        addFile(params);
        req.asset = awsImageUrl + params.Key;
      }
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to create logo");
  }
};
