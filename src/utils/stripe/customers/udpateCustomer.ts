import { StripeCustomerParams } from "@app/stripe";
import stripe from "../connection";

export const udpateCustomer = async ({ id, updateCustomer }: StripeCustomerParams) => {
  if (!id) throw Error("id is required");
  return await stripe.customers.update(id, updateCustomer);
};
