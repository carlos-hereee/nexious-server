const stripe = require("../connection");

module.exports = async ({ amount, currency, paymentMethod }) => {
  if (!currency) currency = "usd";
  if (!paymentMethod) paymentMethod = ["card"];
  return await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: paymentMethod,
  });
};
