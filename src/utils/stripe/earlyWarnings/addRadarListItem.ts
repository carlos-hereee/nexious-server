import stripe  from "../connection";

module.exports = async ({ id, value }) => {
  return await stripe.radar.valueListItems.create({ value_list: id, value });
};
