import type { StoreRequest } from "@app/request";
import { StoreBody } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { addNotification } from "@utils/app/addNotification";

export const editStore = async (req: StoreRequest<StoreBody>, res: Response, next: NextFunction) => {
  try {
    const { storeName, title, body } = req.body;
    const hero = req.asset || "";
    if (storeName) {
      // format link url
      req.store.storeName = storeName;
      req.store.storeLink = "/store/" + req.project.appLink ? req.project.appLink : req.project.appUrl;
    }
    if (title) req.store.title = title;
    if (body) req.store.body = body;
    if (hero) req.store.hero = hero;
    // create notification
    const n = await addNotification({ type: "storeChanges", message: "Store information has been updated", user: req.user });
    if (n) req.project.notifications.push(n._id);
    // save changes to db
    await req.store.save();
    await req.project.save();

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store");
  }
};
