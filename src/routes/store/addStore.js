const createStore = require("../../db/models/store/createStore");
const formatMenuPageData = require("../../utils/app/format/formatMenuPageData");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const addAccount = require("../../utils/stripe/accounts/addAccount");
const message = require("../../db/data/error.message.json");
module.exports = async (req, res, next) => {
  try {
    // key variables
    const { name, title, body, pageName } = req.body;
    const { country, appId } = req.app;
    const ownerId = req.user.userId;
    const hero = req.asset || "";
    const email = req.body.email || req.app.email;
    if (!email) return res.status(400).json(message.emailRequired).end();
    const menuData = formatMenuPageData(name);
    const payload = { ownerId, appId, hero, title, body, pageName, name };

    // create stripe account with app data
    const account = await addAccount({ country, email, type: "standard" });
    // add account id to payload
    payload.accountId = account.id;
    // // save store data
    const store = await createStore(payload);
    // // connect store to app
    req.app.store = store._id;
    req.app.menu.push({ ...menuData, isStore: true });
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
