import { StripeBankParams } from "types/stripe";
import stripe from "../connection";

export const updateCard = async ({ id, accountId, stripeAccount }: StripeBankParams) => {
  if (!id) throw Error("id is required");
  if (!accountId) throw Error("accountId is required");
  return await stripe.accounts.updateExternalAccount(accountId, id, stripeAccount);
};
