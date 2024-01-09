import createStore from "@dbModels/store/createStore";
import formatMenuPageData from "@appUtils/format/formatMenuPageData";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { addAccount } from "@stripe/accounts/addAccount";
import message from "@data/error.message.json";
import type { MiddlewareProps } from "@app/db";

export const addStore: MiddlewareProps = async (req, res, next) => {
  try {
    // key variables
    const { name, title, body, pageName } = req.body;
    const { country, appId } = req.apps;
    const ownerId = req.user.userId;
    const hero = req.asset || "";
    const email = req.body.email || req.apps.email;
    if (!email) return res.status(400).json(message.emailRequired).end();
    const menuData = formatMenuPageData(name);
    const payload = { ownerId, appId, hero, title, body, pageName, name, accountId: "" };

    // create stripe account with app data
    const account = await addAccount({ country, email, type: "standard" });
    // add account id to payload
    payload.accountId = account.id;
    // // save store data
    const store = await createStore(payload);
    // // connect store to app
    req.apps.store = store._id;
    req.apps.menu.push({ ...menuData, isStore: true });
    await req.apps.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
