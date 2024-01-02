import stripe from "../connection";

export = async ({ id, apiKey, stripeAccount }) => {
  if (stripeAccount) {
    return await stripe.customers.retrieve(id, { stripeAccount });
  }
  if (apiKey) return await stripe.customers.retrieve(id, { apiKey });
  return await stripe.customers.retrieve(id);
};
