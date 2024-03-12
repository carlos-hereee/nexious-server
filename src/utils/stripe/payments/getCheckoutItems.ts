import { StripeSession } from "@app/stripe";
import stripe from "../connection";

export const getCheckoutItems = async ({ id, listOptions }: StripeSession) => {
  if (!id) throw Error("id is required");
  return await stripe.checkout.sessions.listLineItems(id, listOptions);
};
