import { StripeBankParams } from "@app/stripe";
import stripe from "../connection";

export const deleteCard = async ({ accountId, id }: StripeBankParams) => {
  if (!id) throw Error("id is required");
  if (!accountId) throw Error("accountId is required");
  return await stripe.accounts.deleteExternalAccount(accountId, id);
};
