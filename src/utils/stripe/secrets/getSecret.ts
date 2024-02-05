import stripe from "../connection";

export const getSecret = async ({ name, scope }) => {
  if (!scope) scope = { type: "account" };
  return await stripe.apps.secrets.find({ name, scope });
};
