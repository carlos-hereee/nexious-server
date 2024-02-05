import stripe from "../connection";

export const cancelFunds = async ({ id }) => {
  return await stripe.topups.cancel(id);
};
