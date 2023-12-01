const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    // update appname
    req.app.appName = req.body.appName;
    // req.asset middleware yields asset url
    req.app.logo = req.asset;
    await req.app.save();
    res.status(200).json({ app: req.app }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred updating app resources");
  }
};
