import stripe  from "../connection";

module.exports = async ({ name, alias, type }) => {
  return await stripe.radar.valueLists.create({ name, alias, item_type: type });
};
