const stripe = require("../connection");

module.exports = async ({ id, cost, currency }) => {
  return await stripe.prices.create({ product: id, unit_amount: cost, currency });
};
