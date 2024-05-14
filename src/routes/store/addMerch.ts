import { createMerch } from "@db/models/merch/createMerch";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { addPrice } from "@utils/stripe/merch/addPrice";
import { addProduct } from "@utils/stripe/merch/addProduct";
import { NextFunction, Response } from "express";
import { AddStoreMerchRequest } from "@app/request";
import Stripe from "stripe";

export const addMerch = async (req: AddStoreMerchRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const { name, description } = req.body;
    const storeId = req.store._id;
    const thumbnail = req.asset || req.assets.hero || req.body.hero || "";
    // add thumbnail to image catalog if exists
    const catalogImages = thumbnail ? (req.assets.catalog.length > 0 ? [thumbnail, ...req.assets.catalog] : [""]) : [];
    // init merch payload
    const payload = { ...req.body, thumbnail, storeId, productId: "", priceId: "", catalog: catalogImages };
    const stripeAccount = req.store.accountId;
    if (stripeAccount) {
      const currency = req.store.currency || "usd";
      // init product data
      const productInfo: Stripe.ProductCreateParams = { name, description };
      // init prices data
      const pricesInfo: Stripe.PriceCreateParams = { currency, product: "", unit_amount: req.body.cost };
      // add images if any in catalog
      if (payload.catalog.length > 0) productInfo.images = catalogImages;
      // add to stripe
      const product = await addProduct({ addProductOptions: productInfo, stripeAccount: { stripeAccount } });
      payload.productId = product.id;
      pricesInfo.product = product.id;
      // add price to product
      const price = await addPrice({ addPriceOptions: pricesInfo, stripeAccount: { stripeAccount } });
      payload.priceId = price.id;
    }
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
