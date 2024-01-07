import stripe from "../connection";

export const updateReversalTransfer = async ({ id, reversalId, metadata }) => {
  return await stripe.transfers.updateReversal(id, reversalId, { metadata });
};
