import stripe from "../connection";

export = async ({ id, metadata }) => {
  return await stripe.topups.update(id, { metadata });
};
