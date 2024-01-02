import stripe  from "../connection";

module.exports = async ({ id, cardId }) => {
  return await stripe.accounts.retrieveExternalAccount(id, cardId);
};
