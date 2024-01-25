import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import { addFile } from "@aws/index.js";
import { awsImageUrl } from "@config";
import { generateParamFile } from "@aws/awsParams.js";
import type { RequestHandler } from "express";

export const saveAsset: RequestHandler = async (req, res, next) => {
  try {
    if (req.file) {
      const params = generateParamFile(req.file);
      if (params) {
        // if (!isDev) await addFile(params);
        await addFile(params);
        req.asset = awsImageUrl + params.Key;
      }
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to create logo");
  }
};
