import { StripeCustomerParams } from "types/stripe";
import stripe from "../connection";

export const deleteCustomer = async ({ id, removeCustomer }: StripeCustomerParams) => {
  if (!id) throw Error("id is required");
  return await stripe.customers.del(id, removeCustomer);
};
