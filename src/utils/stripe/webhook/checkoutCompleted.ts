import Stripe from "stripe";
import { updateStore } from "@db/models/store/updateStore";

export const checkoutCompleted = async (event: Stripe.CheckoutSessionCompletedEvent) => {
  const accountId = event.account;
  // track order id
  const metadata = event.data.object.metadata;
  if (accountId && metadata) {
    const orderId = metadata.orderId;
    try {
      // Save an order in your database, marked as 'awaiting payment'
      await updateStore({ accountId, orderId, status: "awaiting-payment", type: "checkout-complete" });
    } catch (error) {
      console.log("unable to update store order error :>> ", error);
    }
  }
};
