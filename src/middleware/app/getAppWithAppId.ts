import getApp  from "../../db/models/app/getApp";
import useGenericErrors  from "../../utils/auth/useGenericErrors";

module.exports = async (req, res, next) => {
  try {
    const { appId } = req.params;
    req.app = await getApp({ appId });
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to find app with app id ");
  }
};
