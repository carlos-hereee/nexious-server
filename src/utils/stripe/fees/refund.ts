import stripe from "../connection";

export const refund = async ({ id }) => {
  return await stripe.applicationFees.createRefund(id);
};
