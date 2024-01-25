import stripe from "../connection.js";

export const addRadarList = async ({ name, alias, type }) => {
  return await stripe.radar.valueLists.create({ name, alias, item_type: type });
};
