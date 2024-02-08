import { StripeCustomerParams } from "@app/stripe";
import stripe from "../connection";

export const createCustomer = async ({ addCustomer, stripeAccount }: StripeCustomerParams) => {
  return await stripe.customers.create(addCustomer, stripeAccount);
};
