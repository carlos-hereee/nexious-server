import stripe from "../connection.js";

export const removeRadarListItem = async ({ id }) => {
  return await stripe.radar.valueListItems.del(id);
};
