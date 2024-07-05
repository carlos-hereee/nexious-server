import { StripeProductParams } from "@app/stripe";
import stripe from "../connection";

export const updateProduct = async ({ id, productOptions }: StripeProductParams) => {
  if (!id) throw Error("id is required");
  return await stripe.products.update(id, productOptions);
};
// After you create a price, you can only update its metadata, nickname, and active fields.
export const updatePrice = async ({ id, pricesOptions, stripeAccount }: StripeProductParams) => {
  if (!id) throw Error("id is required");
  return await stripe.prices.update(id, pricesOptions, stripeAccount);
};
