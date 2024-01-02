const stripe = require("../connection");

module.exports = async ({ name, scope }) => {
  if (!scope) scope = { type: "account" };

  return await stripe.apps.secrets.deleteWhere({ name, scope });
};
