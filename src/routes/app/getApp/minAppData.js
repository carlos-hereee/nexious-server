const getApp = require("../../../db/models/app/getApp");
const getStore = require("../../../db/models/store/getStore");
const getUser = require("../../../db/models/users/getUser");

module.exports = async (req, res) => {
  try {
    // key varialbles
    const userId = req.user.userId;
    const appName = req.app.appName;

    const appList = await getApp({ all: true });
    const user = await getUser({ userId });
    const app = await getApp({ appName });
    const store = await getStore({ storeId: app.store.storeId });
    // if(app.store.storeId)
    console.log("app :>> ", store);
    res.status(200).json({ user, app, appList, store }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
