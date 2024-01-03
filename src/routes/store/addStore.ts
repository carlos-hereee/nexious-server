import createStore from "@dbModels/store/createStore";
import formatMenuPageData from "../../utils/app/format/formatMenuPageData";
import { useGenericErrors } from "../../utils/auth/useGenericErrors";
import addAccount from "../../utils/stripe/accounts/addAccount";
import message from "@data/error.message.json";
export const addStore = (req, res, next) => {
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
