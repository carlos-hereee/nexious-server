const stripe = require("../connection");

module.exports = async ({ id }) => {
  return await stripe.radar.valueLists.del(id);
};
