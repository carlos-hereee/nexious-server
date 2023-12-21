const stripe = require("../connection");

module.exports = async ({ scope }) => {
  if (!scope) scope = { type: "account" };
  return await stripe.apps.secrets.list({ scope });
};
