import { StripePersonParams } from "@app/stripe";
import stripe from "../connection";

export const addPerson = async ({ id, addOptions }: StripePersonParams) => {
  if (!id) throw Error("id is required");
  return await stripe.accounts.createPerson(id, addOptions);
};
