const getApp = require("../../../db/models/app/getApp");
const getUser = require("../../../db/models/users/getUser");

module.exports = async (req, res) => {
  try {
    // key varialbles
    const userId = req.user.userId;
    const appId = req.app.appId || req.params.appId;

    const appList = await getApp({ all: true });
    const user = await getUser({ userId });
    const app = await getApp({ appId });
    res.status(200).json({ user, app, appList }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
