import { formatMenuPageData } from "@utils/app/format/formatMenuPageData";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";
import type { StoreRequest } from "@app/request";
import { v4 } from "uuid";
import { addNotification } from "@utils/app/addNotification";
import Store from "@db/schema/store";

export const addStore = async (req: StoreRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const { storeName } = req.body;
    const { _id } = req.project;
    const ownerId = req.user._id;
    const email = req.body.email || req.project.email;
    // require email to continue
    if (!email) return res.status(400).json(message.emailRequired).end();
    // format link url
    const link = "/store/" + req.project.appLink ? req.project.appLink : req.project.appUrl;
    const menuData = formatMenuPageData({ pageName: storeName, category: "store", link, menuId: v4() });

    // // save store data
    const store = await Store.create({ ...req.body, email, ownerId, appId: _id, storeLink: link, storeUrl: link });
    // create notification
    const n = await addNotification({ type: "add-store", message: "Successfully created store", link, user: req.user });
    // // connect store to app
    req.project.store = store._id;
    req.project.menu.push(menuData);
    req.project.notifications.push(n._id);
    req.store = store;
    // save to db
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
