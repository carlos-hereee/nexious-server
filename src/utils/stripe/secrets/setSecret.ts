import stripe from "../connection.js";

export const setSecret = async ({ name, payload, scope }) => {
  if (!scope) scope = { type: "account" };

  return await stripe.apps.secrets.create({ name, payload, scope });
};
