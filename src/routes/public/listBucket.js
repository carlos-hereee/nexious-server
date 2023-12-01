const useGenericErrors = require("../../utils/auth/useGenericErrors");
const { getBucket } = require("../../utils/aws");

module.exports = async (req, res) => {
  try {
    const bucketName = req.params.bucketName;
    const data = await getBucket(bucketName);
    console.log("data :>> ", data);
  } catch (error) {
    useGenericErrors(res, error, "error occured list all buckets");
  }
};
