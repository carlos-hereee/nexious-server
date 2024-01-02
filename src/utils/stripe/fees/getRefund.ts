import stripe  from "../connection";

module.exports = async ({ id, refundId, limit }) => {
  if (!refundId) await stripe.applicationFees.listRefunds(id, { limit: limit || 30 });
  return await stripe.applicationFees.retrieveRefund(id, refundId);
};
