const { clientUrl } = require("../../../../config.env");
const stripe = require("../connection");

module.exports = async (cartData) => {
  return await stripe.checkout.sessions.create({
    line_items: cartData,
    mode: "payment",
    success_url: clientUrl + "/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: clientUrl + "/checkout",
  });
};
