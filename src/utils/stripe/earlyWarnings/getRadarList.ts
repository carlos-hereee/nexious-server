import stripe from "../connection";

export = async ({ id, limit }) => {
  if (!id) return await stripe.radar.valueLists.list({ limit: limit || 30 });
  return await stripe.radar.valueLists.retrieve(id);
};
