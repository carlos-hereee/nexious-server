const stripe = require("../connection");

module.exports = async ({ id, reversalId, metadata }) => {
  return await stripe.transfers.updateReversal(id, reversalId, { metadata });
};
