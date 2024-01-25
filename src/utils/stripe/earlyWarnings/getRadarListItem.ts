import stripe from "../connection.js";

export const getRadarListItem = async ({ id, getList }) => {
  if (getList) {
    return await stripe.radar.valueListItems.list({ value_list: id });
  }
  return await stripe.radar.valueListItems.retrieve(id);
};
