import stripe from "../connection";

export = async ({ id, reason }) => {
  return await stripe.accounts.reject(id, { reason });
};
