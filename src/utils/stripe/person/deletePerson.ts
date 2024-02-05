import { StripePersonEventParams } from "@app/stripe";
import stripe from "../connection";

export const deletePerson = async ({ id, accountId }: StripePersonEventParams) => {
  if (!id) throw Error("id is required");
  if (!accountId) throw Error("accountId is required");
  return await stripe.accounts.deletePerson(accountId, id);
};
