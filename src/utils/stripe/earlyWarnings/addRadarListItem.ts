import stripe from "../connection";

export const addRadarListItem = async ({ id, value }) => {
  return await stripe.radar.valueListItems.create({ value_list: id, value });
};
