const stripe = require("../connection");

module.exports = async ({ id, reason }) => {
  return await stripe.accounts.reject(id, { reason });
};
