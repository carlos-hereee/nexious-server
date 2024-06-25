import { StripeCustomerParams } from "types/stripe";
import stripe from "../connection";

export const listCustomers = async ({ customerList }: StripeCustomerParams) => {
  return await stripe.customers.list(customerList);
};
