import stripe from "../connection.js";

export const getStripeCustomer = async ({ customer }) => {
  return await stripe.customers.retrieve(customer);
};
