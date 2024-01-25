import stripe from "../connection.js";

export const getRadarList = async ({ id, limit }) => {
  if (!id) return await stripe.radar.valueLists.list({ limit: limit || 30 });
  return await stripe.radar.valueLists.retrieve(id);
};
