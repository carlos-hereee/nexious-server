import stripe from "../connection.js";

export const getSecret = async ({ name, scope }) => {
  if (!scope) scope = { type: "account" };
  return await stripe.apps.secrets.find({ name, scope });
};
