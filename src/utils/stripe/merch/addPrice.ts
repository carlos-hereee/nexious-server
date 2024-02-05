import { StripeProductParams } from "@app/stripe";
import stripe from "../connection";

export const addPrice = async ({ priceOptions, stripeAccount }: StripeProductParams) => {
  if (!priceOptions) throw Error("priceOptions is required");
  return await stripe.prices.create(priceOptions, stripeAccount);
};
