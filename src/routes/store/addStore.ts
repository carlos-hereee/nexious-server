import { createStore } from "@dbModels/store/createStore";
import { formatMenuPageData } from "@appUtils/format/formatMenuPageData";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { addAccount } from "@stripe/accounts/addAccount";
import message from "@data/error.message.json";
import type { RequestHandler } from "express";

export const addStore: RequestHandler = async (req, res, next) => {
  try {
    if (req.myApp && req.user) {
      // key variables
      const { name, title, body, pageName } = req.body;
      const { country, appId } = req.myApp;
      const ownerId = req.user.userId;
      const hero = req.asset || "";
      const email = req.body.email || req.myApp.email;
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
      req.myApp.store = store._id;
      req.myApp.menu.push({ ...menuData, isStore: true });
      await req.myApp.save();
      next();
    }
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
