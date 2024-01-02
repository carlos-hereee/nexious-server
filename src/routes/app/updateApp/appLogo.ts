import useGenericErrors from "../../../utils/auth/useGenericErrors";

export = async (req, res, next) => {
  try {
    // update appname
    req.app.appName = req.body.appName;
    // req.asset middleware yields asset url
    req.app.logo = req.asset;
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occurred updating app resources");
  }
};
