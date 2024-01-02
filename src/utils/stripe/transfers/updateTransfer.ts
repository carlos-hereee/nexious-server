import stripe from "../connection";

// This request accepts only metadata as an argument.
export = async ({ metadata, id }) => {
  return await stripe.transfers.update(id, { metadata });
};
