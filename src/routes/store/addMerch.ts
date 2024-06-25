import { createMerch } from "@db/models/merch/createMerch";
import { useGenericErrors } from "@utils/auth/useGenericErrors";

import { NextFunction, Response } from "express";
import { addProductInfo } from "./stripe/addProductInfo";
import { MerchBodyParams, MerchSchema } from "types/store";
import { createNotification } from "@db/models/notification/createNotification";
import { StoreRequest } from "types/request";
import { formatNotification } from "@utils/app/format/formatNotification";
import { sendNotification } from "@db/models/notification/sendNotification";
import { generateStringUrl } from "@utils/app/generateUrl";

export const addMerch = async (req: StoreRequest<MerchBodyParams>, res: Response, next: NextFunction) => {
  try {
    // key variables
    const { _id: storeId, accountId, isStripeActive } = req.store;
    const thumbnail = req.asset || req.assets.hero || req.body.hero || "";
    // add thumbnail to image catalog if exists
    const catalog = thumbnail ? (req.assets.catalog.length > 0 ? [thumbnail, ...req.assets.catalog] : [""]) : [];
    // init merch payload
    let payload: MerchSchema = {
      ...req.body,
      thumbnail,
      storeId,
      productId: "",
      priceId: "",
      catalog,
      onHold: 0,
      merchLink: generateStringUrl(req.body.name),
    };
    // create notification
    const notificationData = formatNotification({ type: "add-merch", store: req.store, merch: payload });
    const notification = await createNotification(notificationData);
    // on success link notification to app
    if (notification) {
      req.project.notifications.push(notification._id);
      // req.user.notifications.push(notification._id);
      // notify subscribers
      req.project.subscribers.forEach(async (sub) => {
        await sendNotification({ id: sub, notificationId: notification._id, type: "user" });
      });
      // save to db
      await req.project.save();
      // await req.user.save();
    }

    // add merch to stripe if stripe account is active
    if (accountId && isStripeActive) {
      const { merch, error } = await addProductInfo({ merch: payload, store: req.store });
      if (!error) payload = merch;
    }
    // add merch to db
    const merchData = await createMerch(payload);
    // create ref to merch on store inventory
    req.store.inventory.push(merchData._id);
    await req.store.save();
    next();
    return;
  } catch (error) {
    useGenericErrors(res, error, "unable to add merch");
  }
};
