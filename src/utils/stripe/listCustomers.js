const stripe = require("./connection");

module.exports = async () => await stripe.customers.list();
