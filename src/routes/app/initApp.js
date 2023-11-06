const { v4 } = require("uuid");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const createApp = require("../../db/models/app/createApp");
const formatThemeList = require("../../utils/app/format/formatThemeList");
const formatLanguageList = require("../../utils/app/format/formatLanguageList");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const appName = req.body.appName || req.parms.appName;
    const ownerId = req.user._id;
    const themeList = formatThemeList(req.body.theme);
    const appId = v4();
    const logo = req.logoId;
    // TODO: add aditional  languages
    const language = formatLanguageList(req.body);

    // init app
    const appPayload = { appName, logo, appId, ownerId, themeList, adminIds: [ownerId] };
    const app = await createApp({ ...appPayload, language });
    req.app = app;
    // update user   ownedApps
    req.user.ownedApps = [...req.user.ownedApps, app._id];
    // add user permissions
    req.user.permissions = [...req.user.permissions, { appId: app._id, role: "owner" }];
    req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
