const createStore = require("../../db/models/store/createStore");
const formatMenuPageData = require("../../utils/app/format/formatMenuPageData");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const { name, title, body, pageName } = req.body;
    const appId = req.app.appId;
    const userId = req.user.userId;
    const hero = req.asset || "";
    const menuData = formatMenuPageData(name);

    // save store data
    const store = await createStore({ userId, appId, hero, title, body, pageName });
    // connect store to app
    req.app.store = store._id;
    req.app.menu.push({ ...menuData, isStore: true });
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
