import useGenericErrors  from "../../utils/auth/useGenericErrors";
import { addFile }  from "../../utils/aws";
import { awsImageUrl, isDev }  from "../../../config.env";
import { generateParamFile }  from "../../utils/aws/awsParams";

module.exports = async (req, res, next) => {
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
