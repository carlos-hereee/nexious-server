import stripe  from "../connection";

module.exports = async ({ id, personId, metadata }) => {
  return await stripe.accounts.updatePerson(id, personId, {
    metadata,
  });
};
