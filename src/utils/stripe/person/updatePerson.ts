import stripe from "../connection";

export const updatePerson = async ({ id, personId, metadata }) => {
  return await stripe.accounts.updatePerson(id, personId, {
    metadata,
  });
};
