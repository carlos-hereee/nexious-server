import { StripeCustomerParams } from "types/stripe";
import stripe from "../connection";

export const getStripeCustomer = async ({ getCustomer, id, stripeAccount }: StripeCustomerParams) => {
  if (!id) throw Error("id is required");
  return await stripe.customers.retrieve(id, getCustomer, stripeAccount);
};
