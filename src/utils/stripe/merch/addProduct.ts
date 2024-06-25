import { StripeProductParams } from "types/stripe";
import stripe from "../connection";

export const addProduct = async ({ addProductOptions, stripeAccount }: StripeProductParams) => {
  if (!addProductOptions) throw Error("addProductOptions is required");
  return await stripe.products.create(addProductOptions, stripeAccount);
};
