import stripe from "../connection";

export const addReversalTranser = async ({ amount, destination }) => {
  return await stripe.transfers.createReversal({ amount, destination });
};
