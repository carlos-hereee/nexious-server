const getStore = require("../../db/models/store/getStore");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const { name, body, quantity, cost } = req.body;
    const hero = req.asset;
    let store = await getStore({ appId: req.app.appId });
    // console.log("store :>> ", store);
    store.merchendise.push({ name, hero, body, quantity, cost });
    await store.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};