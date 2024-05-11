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
    const storeId = req.store._id;
    const thumbnail = req.asset || req.assets.hero || req.body.hero || "";
    const catalogImages = req.assets.catalog || req.body.images || [""];
    const stripeAccount = req.store.accountId;
    const currency = req.store.currency || "usd";
    const payload = { ...req.body, thumbnail, storeId, productId: "", priceId: "", catalog: catalogImages };
    const productInfo = { name, description, images: [thumbnail, ...catalogImages] };
    if (stripeAccount) {
      // add to stripe
      const product = await addProduct({ addProductOptions: productInfo, stripeAccount: { stripeAccount } });
      payload.productId = product.id;
      // add price to product
      const price = await addPrice({
        addPriceOptions: { product: product.id, currency },
        stripeAccount: { stripeAccount },
      });
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
