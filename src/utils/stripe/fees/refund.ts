import { StripeFeeParams } from "types/stripe";
import stripe from "../connection";

export const refund = async ({ id }: StripeFeeParams) => {
  if (!id) throw Error("id is required");
  return await stripe.applicationFees.createRefund(id);
};
