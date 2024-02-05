import { StripeFundParams } from "@app/stripe";
import stripe from "../connection";

export const addFunds = async ({ updateFunds }: StripeFundParams) => {
  if (!updateFunds) throw Error("updateFunds is required");
  return await stripe.topups.create(updateFunds);
};
