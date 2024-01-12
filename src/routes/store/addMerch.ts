import { createMerch } from "@dbModels/merch/createMerch";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { addPrice } from "@stripe/merch/addPrice";
import { addProduct } from "@stripe/merch/addProduct";
import type { MiddlewareProps } from "@app/express";

type MerchBodyProps = {
  name: string;
  description: string;
  inStock: number;
  cost: number;
  hero: string;
};
export const addMerch: MiddlewareProps = async (req, res, next) => {
  try {
    // key variables
    const { name, description, inStock, cost, hero: h }: MerchBodyProps = req.body;
    const { storeId, accountId, currency } = req.store;
    const hero: string = req.asset || h || "";
    const payload = { hero, name, description, inStock, cost, storeId, productId: "", priceId: "" };
    const productInfo = { name, description, stripeAccount: accountId, images: [""] };
    if (hero) productInfo.images = [hero];
    // add to stripe
    const product = await addProduct(productInfo);
    payload.productId = product.id;
    // console.log("product :>> ", product);
    // add price to product
    const price = await addPrice({ id: product.id, cost, currency, stripeAccount: accountId });
    payload.priceId = price.id;
    // add merch to db
    const merch = await createMerch(payload);
    // create ref to merch on store inventory
    const refId = merch._id as string;
    req.store.inventory.push(refId);
    await req.store.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add merch");
  }
};
