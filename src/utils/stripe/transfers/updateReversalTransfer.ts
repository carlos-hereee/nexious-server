import type { StripeTransferParams } from "types/stripe";
import stripe from "../connection";

export const updateReversalTransfer = async (params: StripeTransferParams) => {
  const { id, transferId, reversalOptions } = params;
  // require key variables
  if (!id) throw Error("id is required");
  if (!transferId) throw Error("transferId is required");
  return await stripe.transfers.updateReversal(transferId, id, reversalOptions);
};
