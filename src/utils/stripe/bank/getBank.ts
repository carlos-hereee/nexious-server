const stripe = require("../connection");

module.exports = async ({ id, accountId }) => {
  return await stripe.accounts.retrieveExternalAccount(id, accountId);
};
