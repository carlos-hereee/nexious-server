const getApp = require("../../../db/models/app/getApp");
// const getStore = require("../../../db/models/store/getStore");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    const appName = req.params.appName.split("+").join(" ");
    const app = await getApp({ appName });
    // const store = await getStore({ storeId: app.store?.storeId });
    // res.status(200).json({ app, store }).end();
    res.status(200).json({ app }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting app name");
  }
};
