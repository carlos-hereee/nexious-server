const stripe = require("../connection");

module.exports = async ({ id, accountId }) => {
  return await stripe.accounts.deleteExternalAccount(id, accountId);
};
