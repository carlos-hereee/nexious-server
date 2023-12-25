const stripe = require("../connection");

module.exports = async ({ id, options }) => {
  if (options) return await stripe.checkout.sessions.retrieve(id, options);
  return await stripe.checkout.sessions.retrieve(id);
};
