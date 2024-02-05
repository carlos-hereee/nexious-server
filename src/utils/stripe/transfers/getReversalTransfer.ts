import type { StripeTransferEventParams } from "@app/stripe";
import stripe from "../connection";

export const getReversalTransfer = async ({
  id,
  transferId,
  listLimit,
}: StripeTransferEventParams) => {
  // require key variables
  if (!id) throw Error("id is required");
  //  optional transfer id
  if (!transferId) return await stripe.transfers.listReversals(id, { limit: listLimit || 30 });
  return await stripe.transfers.retrieveReversal(id, transferId);
};
