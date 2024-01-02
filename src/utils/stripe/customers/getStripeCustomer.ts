import stripe from "../connection";

export = async ({ customer }) => {
  return await stripe.customers.retrieve(customer);
};
