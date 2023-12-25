const getApp = require("../../db/models/app/getApp");
const getStore = require("../../db/models/store/getStore");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    const { appName } = req.params;
    const payload = {};
    const app = await getApp({ appName });
    if (app) payload.app = app;
    if (app.store && app.store.storeId) {
      payload.store = await getStore({ storeId: app.store?.storeId });
    }
    res.status(200).json(payload).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to get store data");
  }
};
