const useGenericErrors = require("../../utils/auth/useGenericErrors");
const createApp = require("../../db/models/app/createApp");
const formatInitMenu = require("../../utils/app/format/formatInitMenu");
// const formatThemeList = require("../../utils/app/format/formatThemeList");
// const formatLanguageList = require("../../utils/app/format/formatLanguageList");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const appName = req.body.appName;
    const owner = req.user._id;
    const menu = formatInitMenu();
    const app = await createApp({ appName, logo: req.logo, owner, adminIds: [owner], menu });
    // add user permissions
    req.user.ownedApps.push(app._id);
    req.user.permissions.push({ appId: app._id, role: "owner" });
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
