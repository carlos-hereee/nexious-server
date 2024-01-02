const stripe = require("../connection");

module.exports = async ({ id }) => {
  return await stripe.applicationFees.createRefund(id);
};
