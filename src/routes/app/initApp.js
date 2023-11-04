const { v4 } = require("uuid");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const createApp = require("../../db/models/app/createApp");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const appName = req.body.appName || req.parms.appName;
    const ownerId = req.user._id;
    const appId = v4();
    const logo = req.logoId;
    // init app
    const appPayload = { appName, logo, appId, ownerId, adminIds: [ownerId] };
    const app = await createApp(appPayload);
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
