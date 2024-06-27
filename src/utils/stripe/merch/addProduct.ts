import type { StripeProductParams } from "@app/stripe";
import stripe from "../connection";

export const addProduct = async ({ addProductOptions, stripeAccount }: StripeProductParams) => {
  if (!addProductOptions) throw Error("addProductOptions is required");
  return await stripe.products.create(addProductOptions, stripeAccount);
};
export const addPrice = async ({ addPriceOptions, stripeAccount }: StripeProductParams) => {
  if (!addPriceOptions) throw Error("addPriceOptions is required");
  return await stripe.prices.create(addPriceOptions, stripeAccount);
};
