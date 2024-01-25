import stripe from "../connection.js";

export const updateReversalTransfer = async ({ id, reversalId, metadata }) => {
  return await stripe.transfers.updateReversal(id, reversalId, { metadata });
};
