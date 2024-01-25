import stripe from "../connection.js";

export const updateRadarList = async ({ id, name }) => {
  return await stripe.radar.valueLists.update(id, { name });
};
