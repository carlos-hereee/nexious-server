import useGenericErrors  from "../../utils/auth/useGenericErrors";
import message  from "../../db/data/error.message.json";
import getApp  from "../../db/models/app/getApp";

module.exports = async (req, res, next) => {
  try {
    const appName = req.body.appName || req.params.appName;
    const app = await getApp({ appName });
    // if app name is taken
    if (app) res.status(400).json(message.appNameTaken).end();
    else next();
  } catch (error) {
    useGenericErrors(res, error, "error occured fetching appname data data");
  }
};
