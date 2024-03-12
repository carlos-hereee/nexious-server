import { StripeBankParams } from "@app/stripe";
import stripe from "../connection";

// https://stripe.com/docs/api/external_account_bank_accounts/create
export const addBank = async ({ id, externalAccount }: StripeBankParams) => {
  if (!id) throw Error("id is required");
  if (!externalAccount) throw Error("externalAccount is required");
  return await stripe.accounts.createExternalAccount(id, externalAccount);
};
