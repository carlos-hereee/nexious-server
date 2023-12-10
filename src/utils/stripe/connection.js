const { appEmail, stripeAccessKey } = require("../../../config.env");

const Stripe = require("stripe");
const stripe = Stripe(stripeAccessKey);

// const charge = await stripe.charges.retrieve("ch_3LiiC52eZvKYlo2C1da66ZSQ", {
//   apiKey: stripeAccessKey,
// });
// const connect = a

module.exports = stripe;
