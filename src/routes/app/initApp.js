const useGenericErrors = require("../../utils/auth/useGenericErrors");
const createApp = require("../../db/models/app/createApp");
const formatInitMenu = require("../../utils/app/format/formatInitMenu");
// const formatThemeList = require("../../utils/app/format/formatThemeList");
// const formatLanguageList = require("../../utils/app/format/formatLanguageList");
const themeList = require("../../db/data/app/themeList.json");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const appName = req.body.appName;
    const owner = req.user._id;
    const logo = req.asset;
    const menu = formatInitMenu();
    // const themeLis
    const app = await createApp({ appName, logo, owner, adminIds: [owner], menu, themeList });
    // add user permissions
    req.user.ownedApps.push(app._id);
    req.user.permissions.push({ appId: app._id, role: "owner" });
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
