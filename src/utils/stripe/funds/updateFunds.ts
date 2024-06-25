import { StripeFundParams } from "types/stripe";
import stripe from "../connection";

export const updateFunds = async ({ id, fundOptions, stripeAccount }: StripeFundParams) => {
  if (!id) throw Error("id is required");
  return await stripe.topups.update(id, fundOptions, stripeAccount);
};
