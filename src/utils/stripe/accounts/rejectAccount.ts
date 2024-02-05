import stripe from "../connection";

export const rejectAccount = async ({ id, reason }) => {
  return await stripe.accounts.reject(id, { reason });
};
