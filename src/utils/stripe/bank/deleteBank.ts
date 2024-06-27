import { StripeBankParams } from "@app/stripe";
import stripe from "../connection";

export const deleteBank = async ({ id, accountId }: StripeBankParams) => {
  if (!id) throw Error("id is required");
  if (!accountId) throw Error("accountId is required");
  return await stripe.accounts.deleteExternalAccount(id, accountId);
};
