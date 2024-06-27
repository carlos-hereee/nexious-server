import { StripeAccountParams } from "@app/stripe";
import stripe from "../connection";

export const getCapabilities = async (params: StripeAccountParams) => {
  const { id, accountId, accountCapabilityList, accountCapability } = params;
  if (!id) throw Error("id is required");
  if (!accountCapabilityList) return await stripe.accounts.listCapabilities(id, accountCapabilityList);
  if (!accountId) throw Error("accountId is required");
  return await stripe.accounts.retrieveCapability(accountId, id, accountCapability);
};
