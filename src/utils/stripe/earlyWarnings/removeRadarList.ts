import stripe from "../connection.js";

export const removeRadarList = async ({ id }) => {
  return await stripe.radar.valueLists.del(id);
};
