import { createMerch } from "@db/models/merch/createMerch";
import { useGenericErrors } from "@utils/auth/useGenericErrors";

import { NextFunction, Response } from "express";
import { addProductInfo } from "./stripe/addProductInfo";
import { MerchBodyParams, MerchSchema } from "@app/store";
import { createNotification } from "@db/models/notification/createNotification";
import { StoreRequest } from "@app/request";
import { formatNotification } from "@utils/app/format/formatNotification";

export const addMerch = async (req: StoreRequest<MerchBodyParams>, res: Response, next: NextFunction) => {
  try {
    // key variables
    const { _id: storeId, accountId, isStripeActive } = req.store;
    const thumbnail = req.asset || req.assets.hero || req.body.hero || "";
    const user = req.user;
    // add thumbnail to image catalog if exists
    const catalog = thumbnail ? (req.assets.catalog.length > 0 ? [thumbnail, ...req.assets.catalog] : [""]) : [];
    // init merch payload
    let payload: MerchSchema = { ...req.body, thumbnail, storeId, productId: "", priceId: "", catalog, onHold: 0 };
    console.log("payload :>> ", payload);
    const notificationData = formatNotification({ type: "add-merch", store: req.store, merch: payload });
    const notification = await createNotification(notificationData);
    // link notification to app
    req.project.notfications;

    // add merch to stripe if stripe account is active
    console.log("notification :>> ", notification);
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
