import { StripeAccountParams } from "types/stripe";
import stripe from "../connection";

export const updateCapabilities = async ({ id, accountId, updateAccountCapability }: StripeAccountParams) => {
  if (!id) throw Error("id is required");
  if (!accountId) throw Error("accountId is required");
  return await stripe.accounts.updateCapability(accountId, id, updateAccountCapability);
};
