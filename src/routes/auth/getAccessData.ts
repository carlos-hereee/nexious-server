const getApp = require("../../db/models/app/getApp");
const getUser = require("../../db/models/users/getUser");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    let data = {
      appList: await getApp({ all: true }),
      user: await getUser({ userId: req.user.userId }),
      // app: req.app.appId ? await getApp({ appId: req.app.appId }) : undefined,
    };
    // const app = await getApp({ appId: req.app.appId });
    // console.log("data :>> ", data);
    res.status(200).json(data).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
