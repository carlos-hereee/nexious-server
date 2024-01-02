import stripe from "../connection";

export = async ({ id }) => {
  return await stripe.applicationFees.createRefund(id);
};
