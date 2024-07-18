import { StripeFeeParams } from "@app/stripe";
import stripe from "../connection";

export const applicationFees = async ({ id, feeList, feeOptions }: StripeFeeParams) => {
  if (!id) return await stripe.applicationFees.list(feeList);
  return await stripe.applicationFees.retrieve(id, feeOptions);
};
