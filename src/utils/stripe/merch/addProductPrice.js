const stripe = require("../connection");

module.exports = async ({ id, cost, currency }) => {
  await stripe.prices.create({ product: id, unit_amount: cost, currency });
};
