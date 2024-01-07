import { useGenericErrors } from "@authUtils/useGenericErrors";
import { addFile } from "@authUtils/aws";
import { awsImageUrl, isDev } from "@config";
import { generateParamFile } from "@authUtils/aws/awsParams";

export const saveAsset = (req, res, next) => {
  try {
    if (req.file) {
      const params = generateParamFile(req.file);
      if (!isDev) await addFile(params);
      await addFile(params);
      req.asset = awsImageUrl + params.Key;
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to create logo");
  }
};
