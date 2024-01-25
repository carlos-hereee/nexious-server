import stripe from "../connection.js";

export const cancelFunds = async ({ id }) => {
  return await stripe.topups.cancel(id);
};
