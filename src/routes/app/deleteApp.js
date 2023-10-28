const { isDev } = require("../../../config.env");
const getApp = require("../../db/models/app/getApp");
const removeApp = require("../../db/models/app/removeApp");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    const appId = req.params.appId;
    // if match remove from owned app
    const removeFromOwned = req.user.ownedApps.filter((data) => data.appId !== appId);
    req.user.ownedApps = removeFromOwned;
    await req.user.save();
    await removeApp({ appId });
    const appList = await getApp({ all: true });
    res.status(200).json({ user: req.user, appList }).end();
  } catch (error) {
    isDev && console.log("error", error);
    useGenericErrors(res, error, "error occured removing app");
  }
};
