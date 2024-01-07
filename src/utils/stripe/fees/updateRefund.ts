import stripe from "../connection";

export const updateRefund = async ({ id, refundId, metadata }) => {
  return await stripe.applicationFees.updateRefund(id, refundId, { metadata });
};
