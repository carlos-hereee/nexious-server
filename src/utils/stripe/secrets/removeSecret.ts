import stripe from "../connection";

export const removeSecret = async ({ name, scope }) => {
  if (!scope) scope = { type: "account" };

  return await stripe.apps.secrets.deleteWhere({ name, scope });
};
