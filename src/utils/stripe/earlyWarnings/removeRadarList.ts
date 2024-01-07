import stripe from "../connection";

export const removeRadarList = async ({ id }) => {
  return await stripe.radar.valueLists.del(id);
};
