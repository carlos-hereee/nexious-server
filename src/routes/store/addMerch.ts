import { createMerch } from "@db/models/merch/createMerch";
import { useGenericErrors } from "@utils/auth/useGenericErrors";

import { NextFunction, Response } from "express";
import { AddStoreMerchRequest } from "@app/request";
import { addProductInfo } from "./stripe/addProductInfo";
import { MerchSchema } from "@app/store";

export const addMerch = async (req: AddStoreMerchRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const { _id: storeId, accountId, isStripeActive } = req.store;
    const thumbnail = req.asset || req.assets.hero || req.body.hero || "";
    // add thumbnail to image catalog if exists
    const catalog = thumbnail ? (req.assets.catalog.length > 0 ? [thumbnail, ...req.assets.catalog] : [""]) : [];
    // init merch payload
    let payload: MerchSchema = { ...req.body, thumbnail, storeId, productId: "", priceId: "", catalog, onHold: 0 };
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
  } catch (error) {
    useGenericErrors(res, error, "unable to add merch");
  }
};
