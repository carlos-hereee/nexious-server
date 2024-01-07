import stripe from "../connection";

export const getTransfer = async ({ id, limit }) => {
  if (!id) return await stripe.transfers.list({ limit: limit || 30 });
  return await stripe.transfers.retrieve(id);
};
