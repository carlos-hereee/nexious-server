import { StripeProductParams } from "types/stripe";
import stripe from "../connection";

export const addPrice = async ({ addPriceOptions, stripeAccount }: StripeProductParams) => {
  if (!addPriceOptions) throw Error("addPriceOptions is required");
  return await stripe.prices.create(addPriceOptions, stripeAccount);
};
