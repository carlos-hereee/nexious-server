import { StripeProductParams } from "types/stripe";
import stripe from "../connection";

export const updateProduct = async ({ id, productOptions }: StripeProductParams) => {
  if (!id) throw Error("id is required");
  return await stripe.products.update(id, productOptions);
};
