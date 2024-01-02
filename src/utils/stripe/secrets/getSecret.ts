import stripe  from "../connection";

module.exports = async ({ name, scope }) => {
  if (!scope) scope = { type: "account" };
  return await stripe.apps.secrets.find({ name, scope });
};
