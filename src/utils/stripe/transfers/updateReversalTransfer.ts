import stripe from "../connection";

export = async ({ id, reversalId, metadata }) => {
  return await stripe.transfers.updateReversal(id, reversalId, { metadata });
};
