import stripe from "../connection";

export const getAccount = async ({ id, limit }) => {
  if (!id) return await stripe.accounts.list({ limit: limit || 30 });
  return await stripe.accounts.retrieve(id);
};
