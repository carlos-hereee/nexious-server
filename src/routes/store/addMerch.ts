import { createMerch } from "@db/models/merch/createMerch";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { addPrice } from "@utils/stripe/merch/addPrice";
import { addProduct } from "@utils/stripe/merch/addProduct";
import { NextFunction, Response } from "express";
import { AddStoreMerchRequest } from "@app/request";

export const addMerch = async (req: AddStoreMerchRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const { name, description } = req.body;
    const { accountId } = req.store;
    const storeId = req.store._id;
    const hero = req.asset || req.body.hero || "";
    const currency = req.store.currency || "usd";
    const payload = { ...req.body, hero, storeId, productId: "", priceId: "" };
    const productInfo = { name, description, stripeAccount: accountId, images: [""] };
    if (hero) productInfo.images = [hero];
    // add to stripe
    const product = await addProduct({ addProductOptions: productInfo });
    payload.productId = product.id;
    // add price to product
    const price = await addPrice({
      addPriceOptions: { product: product.id, currency },
      stripeAccount: { stripeAccount: accountId },
    });
    payload.priceId = price.id;
    // add merch to db
    const merch = await createMerch(payload);
    // create ref to merch on store inventory
    req.store.inventory.push(merch._id);
    await req.store.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add merch");
  }
};
