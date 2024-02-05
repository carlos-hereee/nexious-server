import stripe from "../connection";

export const removeRadarListItem = async ({ id }) => {
  return await stripe.radar.valueListItems.del(id);
};
