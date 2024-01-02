import stripe  from "../connection";

module.exports = async ({ id, refundId, metadata }) => {
  return await stripe.applicationFees.updateRefund(id, refundId, { metadata });
};
