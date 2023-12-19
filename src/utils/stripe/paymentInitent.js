const stripe = require("./connection");

module.exports = async (amount, currency) => {
  return await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ["card"],
  });
};
