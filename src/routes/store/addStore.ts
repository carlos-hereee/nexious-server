import { formatMenuPageData } from "@utils/app/format/formatMenuPageData";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";
import type { StoreRequest } from "@app/request";
import { createStore } from "@db/models/store/createStore";
import { addAccount } from "@utils/stripe/accounts/addAccount";
import { v4 } from "uuid";
import { StoreSchema } from "@app/store";
import { generateStringUrl } from "@utils/app/generateUrl";
import { addNotification } from "@utils/app/addNotification";

export const addStore = async (req: StoreRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const { storeName } = req.body;
    const { country, _id } = req.project;
    const ownerId = req.user._id;
    const hero = req.asset || "";
    const email = req.body.email || req.project.email;
    // require email to continue
    if (!email) return res.status(400).json(message.emailRequired).end();
    // format link url
    const link = "/store/" + req.project.appUrl;
    const menuData = formatMenuPageData({ pageName: storeName, category: "store", link, menuId: v4() });
    const storeData: StoreSchema = {
      ...req.body,
      email,
      ownerId,
      appId: _id,
      hero,
      storeLink: generateStringUrl(req.body.storeName),
      accountId: "",
      inventory: [],
      pendingOrders: [],
      completedOrders: [],
      inCompleteOrders: [],
      orders: [],
    };

    const account = await addAccount({ addAccount: { country, email, type: "standard" } });
    // // add account id to payload
    storeData.accountId = account.id;
    // // save store data
    const store = await createStore(storeData);
    // create notification
    const notification = await addNotification({
      type: "add-store",
      message: "Successfull added merch to inventory",
      link: `/store/${generateStringUrl(req.store?.storeName || "")}`,
    });
    // // connect store to app
    req.project.store = store._id;
    req.project.menu.push(menuData);
    req.project.notifications.push(notification._id);
    req.store = store;
    // save to db
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
