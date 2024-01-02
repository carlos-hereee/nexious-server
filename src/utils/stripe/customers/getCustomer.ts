const stripe = require("../connection");

module.exports = async ({ id, apiKey, stripeAccount }) => {
  if (stripeAccount) {
    return await stripe.customers.retrieve(id, { stripeAccount });
  }
  if (apiKey) return await stripe.customers.retrieve(id, { apiKey });
  return await stripe.customers.retrieve(id);
};
