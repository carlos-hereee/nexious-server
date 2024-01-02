import stripe from "../connection";

export = async ({ id, refundId, metadata }) => {
  return await stripe.applicationFees.updateRefund(id, refundId, { metadata });
};
