import { StripeFundParams } from "types/stripe";
import stripe from "../connection";

export const addFunds = async ({ updateFunds, id }: StripeFundParams) => {
  if (!updateFunds) throw Error("updateFunds is required");
  if (!id) throw Error("id is required");
  return await stripe.topups.create(updateFunds, { stripeAccount: id });
};
export const handlePayouts = async ({ id }: StripeFundParams) => {
  if (!id) throw Error("id is required");
  return await stripe.financialConnections.accounts.list({ account_holder: { account: id } }, { stripeAccount: id });
};
