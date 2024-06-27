import { StripeFundParams } from "@app/stripe";
import stripe from "../connection";

export const getFunds = async ({ id, listLimit, searchOptions }: StripeFundParams) => {
  if (!id) return await stripe.topups.list({ limit: listLimit || 30 });
  return await stripe.topups.retrieve(id, searchOptions);
};
export const getBalance = async ({ id }: StripeFundParams) => {
  // require key variable
  if (!id) throw Error("id param is required");
  return await stripe.balance.retrieve({ stripeAccount: id });
};
