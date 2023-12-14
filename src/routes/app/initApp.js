const useGenericErrors = require("../../utils/auth/useGenericErrors");
const createApp = require("../../db/models/app/createApp");
// const formatThemeList = require("../../utils/app/format/formatThemeList");
// const formatLanguageList = require("../../utils/app/format/formatLanguageList");
const themeList = require("../../db/data/app/themeList.json");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const appName = req.body.appName;
    const owner = req.user._id;
    const appUrl = "app/" + appName.split(" ").join("+");
    const logo = req.asset;
    // const logo = { url: req.asset, alt: appName + " industry brand", link: appUrl };
    const adminIds = [{ userId: owner, role: "owner" }];
    // const themeLis
    const app = await createApp({ appName, logo, owner, adminIds, themeList, appUrl });
    // add user permissions
    req.app = app;
    req.user.ownedApps.push(app._id);
    req.user.permissions.push({ appId: app._id, role: "owner" });
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
