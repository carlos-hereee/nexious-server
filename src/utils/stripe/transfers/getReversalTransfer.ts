import stripe from "../connection";

export = async ({ id, reversalId, limit }) => {
  if (!id) return await stripe.transfers.listReversals(id, { limit: limit || 30 });
  return await stripe.transfers.retrieveReversal(id, reversalId);
};
