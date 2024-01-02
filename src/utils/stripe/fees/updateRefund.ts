const stripe = require("../connection");

module.exports = async ({ id, refundId, metadata }) => {
  return await stripe.applicationFees.updateRefund(id, refundId, { metadata });
};
