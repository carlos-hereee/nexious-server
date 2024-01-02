import stripe  from "../connection";

module.exports = async ({ id }) => {
  return await stripe.radar.valueListItems.del(id);
};
