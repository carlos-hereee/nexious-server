import stripe from "../connection";

export = async ({ id }) => {
  return await stripe.radar.valueLists.del(id);
};
