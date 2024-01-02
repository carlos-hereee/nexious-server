const stripe = require("../connection");

module.exports = async ({ id }) => {
  return await stripe.accounts.createPerson(id);
};
