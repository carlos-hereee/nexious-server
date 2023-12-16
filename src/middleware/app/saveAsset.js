const useGenericErrors = require("../../utils/auth/useGenericErrors");
const { addFile } = require("../../utils/aws");
const { awsImageUrl, isDev } = require("../../../config.env");
const { generateParamFile } = require("../../utils/aws/awsParams");

module.exports = async (req, res, next) => {
  try {
    if (req.file) {
      const params = generateParamFile(req.file);
      // if (!isDev) await addFile(params);
      await addFile(params);
      req.asset = awsImageUrl + params.Key;
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to create logo");
  }
};
