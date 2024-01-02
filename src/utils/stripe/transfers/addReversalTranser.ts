const stripe = require("../connection");

module.exports = async ({ amount, destination }) => {
  return await stripe.transfers.createReversal({ amount, destination });
};
