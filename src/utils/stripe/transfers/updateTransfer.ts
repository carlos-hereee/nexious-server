import stripe from "../connection";

// This request accepts only metadata as an argument.
export const updateTransfer = async ({ metadata, id }) => {
  return await stripe.transfers.update(id, { metadata });
};