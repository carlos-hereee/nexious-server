const stripe = require("../connection");

module.exports = async ({ id, cardId }) => {
  return await stripe.accounts.deleteExternalAccount(id, cardId);
};
