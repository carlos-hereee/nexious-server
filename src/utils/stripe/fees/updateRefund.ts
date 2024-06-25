import { StripeFeeParams } from "types/stripe";
import stripe from "../connection";

export const updateRefund = async ({ id, refundId, stripeAccount }: StripeFeeParams) => {
  if (!id) throw Error("id is required");
  if (!refundId) throw Error("refundId is required");
  return await stripe.applicationFees.updateRefund(id, refundId, stripeAccount);
};
