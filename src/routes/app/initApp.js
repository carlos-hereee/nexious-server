const useGenericErrors = require("../../utils/auth/useGenericErrors");
const createApp = require("../../db/models/app/createApp");
const formatThemeList = require("../../utils/app/format/formatThemeList");
const formatLanguageList = require("../../utils/app/format/formatLanguageList");
const { v4 } = require("uuid");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const appName = req.body.appName || req.parms.appName;
    const ownerId = req.user._id;
    const themeList = formatThemeList(req.body.theme);
    // TODO: add aditional  languages data
    const appPayload = { appName, logo: req.logoId, ownerId, themeList, adminIds: [ownerId] };
    const language = formatLanguageList(req.body, appPayload);
    // const appData = formatInitAppData(language, appPayload);
    // console.log("appData :>> ", appData);
    const app = await createApp({ ...appPayload, ...language, appId: v4() });
    req.app = app;
    // update user   ownedApps
    req.user.ownedApps = [...req.user.ownedApps, app._id];
    // add user permissions
    req.user.permissions = [...req.user.permissions, { appId: app._id, role: "owner" }];
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
