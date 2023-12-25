const stripe = require("../connection");

module.exports = async ({ id, cardId, metadata }) => {
  return await stripe.accounts.updateExternalAccount(id, cardId, {
    metadata,
  });
};
