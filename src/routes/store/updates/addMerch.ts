import { createMerch } from "@db/models/merch/createMerch";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { addProductInfo } from "../../stripe/stripe/updateProductInfo";
import type { MerchBodyParams, MerchSchema } from "@app/store";
import type { StoreRequest } from "@app/request";
import { sendNotification } from "@db/models/notification/sendNotification";
import { generateStringUrl } from "@utils/app/generateUrl";
import { addNotification } from "@utils/app/addNotification";

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
      hero: thumbnail,
      productId: "",
      priceId: "",
      catalog,
      onHold: 0,
      link: `/store/${req.project?.appLink}/${generateStringUrl(req.body.name)}`,
    };
    // create notification TODO: ADD MERCH CONTENT
    const n = await addNotification({
      type: "storeChanges",
      message: "Successfull added merch to inventory",
      link: payload.link,
      user: req.user,
    });
    // on success link notification to app
    if (n) {
      req.project.notifications.push(n._id);
      // req.user.notifications.push(notification._id);
      // notify subscribers
      req.project.subscribers.forEach(async (sub) => {
        await sendNotification({ id: sub, notificationId: n._id, type: "user" });
      });
      // save to db
      await req.project.save();
    }

    // add merch to stripe if stripe account is active
    if (accountId && isStripeActive) {
      const { merch, error } = await addProductInfo({ merch: payload, accountId, currency: req.store.currency });
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
