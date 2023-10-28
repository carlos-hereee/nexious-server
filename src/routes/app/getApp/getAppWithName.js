const getApp = require("../../../db/models/app/getApp");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    const appName = req.params.appName.split("+").join(" ");
    const apps = await getApp({ appName });
    res.status(200).json(apps).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting app name");
  }
};
