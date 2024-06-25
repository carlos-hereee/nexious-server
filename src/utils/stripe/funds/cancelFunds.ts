import { StripeFundParams } from "types/stripe";
import stripe from "../connection";

export const cancelFunds = async ({ id, cancelOptions }: StripeFundParams) => {
  if (!id) throw Error("id is required");
  return await stripe.topups.cancel(id, cancelOptions);
};
