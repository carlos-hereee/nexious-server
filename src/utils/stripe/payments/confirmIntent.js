const stripe = require("../connection");

module.exports = async ({ id, paymentMethod }) => {
  if (!paymentMethod) paymentMethod = ["pm_card_visa"];
  return await stripe.paymentIntents.confirm(id, {
    payment_method: paymentMethod,
  });
};
