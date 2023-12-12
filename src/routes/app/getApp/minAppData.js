const getApp = require("../../../db/models/app/getApp");
const getUser = require("../../../db/models/users/getUser");

module.exports = async (req, res) => {
  try {
    // key varialbles
    const userId = req.user.userId;
    const appName = req.app.appName;

    const appList = await getApp({ all: true });
    const user = await getUser({ userId });
    const app = await getApp({ appName });
    // console.log("app :>> ", app.store);
    res.status(200).json({ user, app, appList }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
