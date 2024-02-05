import stripe from "../connection";

export const listCustomers = async (stripeAccount: string) => {
  if (stripeAccount) {
    return stripe.customers.list({}, { stripeAccount });
  }
  return await stripe.customers.list();
};
