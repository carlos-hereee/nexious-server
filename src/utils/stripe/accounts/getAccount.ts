import type { StripeAccountParams } from "@app/stripe";
import stripe from "../connection";

export const getAccount = async ({ id }: StripeAccountParams) => {
  if (!id) throw Error("id is required");
  return await stripe.accounts.retrieve(id);
};
export const getAccountList = async ({ accountList }: StripeAccountParams) => {
  return await stripe.accounts.list(accountList);
};
export const getCapabilities = async (params: StripeAccountParams) => {
  const { id, accountId, accountCapabilityList, accountCapability } = params;
  if (!id) throw Error("id is required");
  if (!accountCapabilityList) return await stripe.accounts.listCapabilities(id, accountCapabilityList);
  if (!accountId) throw Error("accountId is required");
  return await stripe.accounts.retrieveCapability(accountId, id, accountCapability);
};
