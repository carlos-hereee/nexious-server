import stripe from "../connection";

export const updateFunds = async ({ id, metadata }) => {
  return await stripe.topups.update(id, { metadata });
};
