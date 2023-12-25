const { stripeSecretKey } = require("../../../config.env");

const Stripe = require("stripe");
const stripe = Stripe(stripeSecretKey);

module.exports = stripe;
