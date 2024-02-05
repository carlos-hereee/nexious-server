import stripe from "../connection";

export const addRadarList = async ({ name, alias, type }) => {
  return await stripe.radar.valueLists.create({ name, alias, item_type: type });
};
