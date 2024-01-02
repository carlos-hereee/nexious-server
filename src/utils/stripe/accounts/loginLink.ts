import stripe  from "../connection";

module.exports = async ({ id }) => await stripe.accounts.createLoginLink(id);
