const getApp = require("../../../db/models/app/getApp");
const getUser = require("../../../db/models/users/getUser");

module.exports = async (req, res) => {
  try {
    const appList = await getApp({ all: true });
    const user = await getUser({ userId: req.user.userId });
    const app = await getApp({ appId: req.app.appId });
    res.status(200).json({ user, app, appList }).end();
    // res.status(200).json({ user, appList }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
