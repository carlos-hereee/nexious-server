import stripe from "../connection";

export const addSecret = async ({ scope }) => {
  if (!scope) scope = { type: "account" };
  return await stripe.apps.secrets.list({ scope });
};
