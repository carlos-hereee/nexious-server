import { StripePersonParams } from "types/stripe";
import stripe from "../connection";

export const updatePerson = async ({ id, accountId, personOptions }: StripePersonParams) => {
  if (!accountId) throw Error("accountId is required");
  if (!id) throw Error("id is required");
  return await stripe.accounts.updatePerson(accountId, id, personOptions);
};
