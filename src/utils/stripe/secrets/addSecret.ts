import stripe  from "../connection";

module.exports = async ({ scope }) => {
  if (!scope) scope = { type: "account" };
  return await stripe.apps.secrets.list({ scope });
};
