const stripe = require("../connection");

module.exports = async ({ id, name }) => {
  return await stripe.radar.valueLists.update(id, { name });
};
