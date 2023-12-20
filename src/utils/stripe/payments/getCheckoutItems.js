const stripe = require("../connection");

module.exports = async ({ id }) => {
  return await stripe.checkout.sessions.listLineItems(id);
};
