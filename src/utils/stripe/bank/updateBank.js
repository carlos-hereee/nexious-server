const stripe = require("../connection");

module.exports = async ({ metadata, id, accountId }) => {
  return await stripe.accounts.updateExternalAccount(id, accountId, {
    metadata,
  });
};
