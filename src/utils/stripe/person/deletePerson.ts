import stripe  from "../connection";

module.exports = async ({ id, personId }) => await stripe.accounts.deletePerson(id, personId);
