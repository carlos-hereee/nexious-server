import stripe from "../connection";

export = async ({ id, name }) => {
  return await stripe.radar.valueLists.update(id, { name });
};
