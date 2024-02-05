import stripe from "../connection";

export const getStripeCustomer = async ({ customer }) => {
  return await stripe.customers.retrieve(customer);
};
