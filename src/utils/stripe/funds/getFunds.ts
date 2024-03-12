import { StripeFundParams } from "@app/stripe";
import stripe from "../connection";

export const getFunds = async ({ id, listLimit, searchOptions }: StripeFundParams) => {
  if (!id) return await stripe.topups.list({ limit: listLimit || 30 });
  return await stripe.topups.retrieve(id, searchOptions);
};
