import { StripeBankParams } from "types/stripe";
import stripe from "../connection";

// https://stripe.com/docs/api/external_account_cards/create
export const addCard = async ({ id, externalAccount }: StripeBankParams) => {
  if (!id) throw Error("id is required");
  if (!externalAccount) throw Error("externalAccount is required");
  return await stripe.accounts.createExternalAccount(id, externalAccount);
};
