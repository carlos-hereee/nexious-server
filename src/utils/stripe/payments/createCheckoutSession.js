const stripe = require("../connection");

module.exports = async (cartData) =>
  await stripe.checkout.sessions.create({
    line_items: cartData,
    mode: "payment",
    success_url: "",
    cancel_url: "",
  });
