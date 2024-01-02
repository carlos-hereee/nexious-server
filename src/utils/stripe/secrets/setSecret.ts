import stripe  from "../connection";

module.exports = async ({ name, payload, scope }) => {
  if (!scope) scope = { type: "account" };

  return await stripe.apps.secrets.create({ name, payload, scope });
};
