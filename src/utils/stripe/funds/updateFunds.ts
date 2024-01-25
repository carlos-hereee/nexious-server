import stripe from "../connection.js";

export const updateFunds = async ({ id, metadata }) => {
  return await stripe.topups.update(id, { metadata });
};
