import { useGenericErrors } from "@authUtils/useGenericErrors";
import { addFile } from "@aws/index";
import { awsImageUrl, isDev } from "@config";
import { generateParamFile } from "@aws/awsParams";
import type { MiddlewareProps } from "@app/db";
export const saveAsset: MiddlewareProps = async (req, res, next) => {
  try {
    if (req.file) {
      const params = generateParamFile(req.file);
      if (params) {
        if (!isDev) await addFile(params);
        await addFile(params);
        req.asset = awsImageUrl + params.Key;
      }
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to create logo");
  }
};
