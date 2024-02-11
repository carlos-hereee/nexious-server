import { createStore } from "@db/models/store/createStore";
import { formatMenuPageData } from "@utils/app/format/formatMenuPageData";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { addAccount } from "@utils/stripe/accounts/addAccount";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";
import { StoreCreateRequest } from "@app/request";

export const addStore = async (req: StoreCreateRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const { name } = req.body;
    const { country, _id } = req.myApp;
    const ownerId = req.user._id;
    const hero = req.asset || "";
    const email = req.body.email || req.myApp.email;
    if (!email) return res.status(400).json(message.emailRequired).end();
    const menuData = formatMenuPageData(name);
    const payload = { ...req.body, email, ownerId, appId: _id, hero, accountId: "", inventory: [] };

    // create stripe account with app data
    const account = await addAccount({ addAccount: { country, email, type: "standard" } });
    // add account id to payload
    payload.accountId = account.id;
    // // save store data
    const store = await createStore(payload);
    // // connect store to app
    req.myApp.store = store._id;
    req.myApp.menu.push({ ...menuData, isStore: true });
    await req.myApp.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
