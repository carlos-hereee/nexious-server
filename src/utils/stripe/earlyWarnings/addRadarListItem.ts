import stripe from "../connection";

export = async ({ id, value }) => {
  return await stripe.radar.valueListItems.create({ value_list: id, value });
};
