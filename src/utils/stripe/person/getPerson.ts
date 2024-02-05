import { StripePersonEventParams } from "@app/stripe";
import stripe from "../connection";

export const getPerson = async (params: StripePersonEventParams) => {
  const { id, accountId, listLimit, personOptions } = params;
  if (!id) throw Error("id is required");
  if (!accountId) {
    return await stripe.accounts.listPersons(id, { limit: listLimit || 30 });
  }
  return await stripe.accounts.retrievePerson(id, accountId, personOptions);
};
