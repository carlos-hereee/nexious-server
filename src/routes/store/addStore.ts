import { formatMenuPageData } from "@utils/app/format/formatMenuPageData";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";
import { StoreRequest } from "@app/request";
import { createStore } from "@db/models/store/createStore";
import { addAccount } from "@utils/stripe/accounts/addAccount";

export const addStore = async (req: StoreRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const { storeName } = req.body;
    const { country, _id } = req.project;
    const ownerId = req.user._id;
    const hero = req.asset || "";
    const email = req.body.email || req.project.email;
    if (!email) return res.status(400).json(message.emailRequired).end();
    const menuData = formatMenuPageData(storeName);
    const payload = { ...req.body, email, ownerId, appId: _id, hero, accountId: "", inventory: [] };
    // console.log("menuData :>> ", menuData);
    // console.log("payload :>> ", payload);
    // console.log("country :>> ", country);
    // // create stripe account with app data
    const account = await addAccount({ addAccount: { country, email, type: "standard" } });
    // // add account id to payload
    // console.log("account :>> ", account);
    payload.accountId = account.id;
    // // save store data
    const store = await createStore(payload);
    // // connect store to app
    req.project.store = store._id;
    req.project.menu.push({ ...menuData, isStore: true });
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
