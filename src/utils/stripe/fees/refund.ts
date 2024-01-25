import stripe from "../connection.js";

export const refund = async ({ id }) => {
  return await stripe.applicationFees.createRefund(id);
};
