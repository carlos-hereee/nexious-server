const stripe = require("../connection");

module.exports = async ({ id }) => await stripe.reviews.approve(id);
