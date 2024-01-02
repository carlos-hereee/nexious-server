const stripe = require("../connection");

module.exports = async ({ amount, description, descriptor, currency }) => {
  if (!currency) currency = "usd";
  if (!descriptor) descriptor = "Top-up";

  return await stripe.topups.create({
    amount,
    currency,
    description,
    statement_descriptor: descriptor,
  });
};
