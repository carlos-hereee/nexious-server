import type { MerchSchema } from "@app/store";
import stripe from "../connection";
import S from "stripe";
import { updatePrice } from "./updateProduct";
import { v4 } from "uuid";

interface AddPrice {
  accountId?: string;
  currency: string;
  merch: MerchSchema;
}
interface AddProduct {
  accountId?: string;
  merch: MerchSchema;
}
// After you create a price, you can only update its metadata, nickname, and active fields.
export const addPrice = async ({ currency, merch, accountId }: AddPrice) => {
  // link to connect account
  const stripeAccount = accountId ? { stripeAccount: accountId } : undefined;
  // if merch has an old price id disable price
  if (merch.priceId) await updatePrice({ id: merch.priceId, pricesOptions: { active: false }, stripeAccount });

  const pricesInfo: S.PriceCreateParams = {
    currency,
    product: merch.productId,
    unit_amount: merch.cost,
    // is price is a subscription
    recurring: merch.recurring ? { interval: merch.recurring } : undefined,
    // A lookup key used to retrieve prices dynamically from a static string.
    lookup_key: merch.lookUpKey || v4(),
  };
  const prices = await stripe.prices.create(pricesInfo, stripeAccount);
  // link price id to merch
  merch.priceId = prices.id;

  return merch;
};

export const addProduct = async ({ accountId, merch }: AddProduct) => {
  // prepare product data
  const productInfo: S.ProductCreateParams = { name: merch.name, description: merch.description };
  // add images if any in catalog
  if (merch.catalog && merch.catalog.length > 0) productInfo.images = merch.catalog.filter((_, idx) => _ && idx < 8);
  const stripeAccount = accountId ? { stripeAccount: accountId } : undefined;

  // add to stripe
  const product = await stripe.products.create(productInfo, stripeAccount);
  // link product id to merch
  merch.productId = product.id;

  return merch;
};
