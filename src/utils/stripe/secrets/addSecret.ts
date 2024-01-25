import stripe from "../connection.js";

export const addSecret = async ({ scope }) => {
  if (!scope) scope = { type: "account" };
  return await stripe.apps.secrets.list({ scope });
};
