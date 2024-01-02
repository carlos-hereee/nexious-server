import stripe from "../connection";

export = async ({ id, personId, metadata }) => {
  return await stripe.accounts.updatePerson(id, personId, {
    metadata,
  });
};
