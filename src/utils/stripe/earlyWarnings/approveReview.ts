import stripe  from "../connection";

module.exports = async ({ id }) => await stripe.reviews.approve(id);
