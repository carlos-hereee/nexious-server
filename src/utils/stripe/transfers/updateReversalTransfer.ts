import type { StripeTransferEventParams } from "@app/stripe";
import stripe from "../connection";

export const updateReversalTransfer = async (params: StripeTransferEventParams) => {
  const { id, transferId, reversalOptions } = params;
  // require key variables
  if (!id) throw Error("id is required");
  if (!transferId) throw Error("transferId is required");
  return await stripe.transfers.updateReversal(transferId, id, reversalOptions);
};
