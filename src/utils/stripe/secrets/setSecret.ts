import stripe from "../connection";

export const setSecret = async ({ name, payload, scope }) => {
  if (!scope) scope = { type: "account" };

  return await stripe.apps.secrets.create({ name, payload, scope });
};
