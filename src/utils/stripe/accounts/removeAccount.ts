const stripe = require("../connection");

module.exports = async ({ id }) => await stripe.accounts.del(id);
