import stripe from "../connection.js";

export const rejectAccount = async ({ id, reason }) => {
  return await stripe.accounts.reject(id, { reason });
};
