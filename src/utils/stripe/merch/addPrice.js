const stripe = require("../connection");

module.exports = async ({ id, cost, currency, stripeAccount }) => {
  if (stripeAccount) {
    return await stripe.prices.create(
      { product: id, unit_amount: cost, currency },
      { stripeAccount }
    );
  }
  return await stripe.prices.create({ product: id, unit_amount: cost, currency });
};
