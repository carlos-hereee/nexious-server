const stripe = require("../connection");

module.exports = async (stripeAccount) => {
  if (stripeAccount) {
    return stripe.customers.list({}, { stripeAccount });
  }
  return await stripe.customers.list();
};
