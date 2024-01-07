import stripe from "../connection";

export const updateRadarList = async ({ id, name }) => {
  return await stripe.radar.valueLists.update(id, { name });
};
