import Stripe from "stripe";
import { updateStore } from "@db/models/store/updateStore";
import { completeCheckoutOrder } from "./fulfillOrder";

export const checkoutCompleted = async (event: Stripe.CheckoutSessionCompletedEvent) => {
  const accountId = event.account;
  // track order id
  const { payment_status, id, metadata } = event.data.object;
  // TODO: FULLFILL SUSCRIBTION CHECKOUT
  // try {
  if (!accountId && event.data.object.mode === "subscription") {
    console.log("checkoutCompleted subscription:>> ", event.data.object.mode);
  } else if (accountId) {
    const orderId = metadata ? metadata.orderId : undefined;
    // fullfill order is checkout is paid
    if (payment_status === "paid") await completeCheckoutOrder({ accountId, orderId, sessionId: id });
    // Save an order in your database, marked as 'awaiting payment'
    else await updateStore({ accountId, orderId, status: "awaiting-payment", type: "checkout-complete" });
  }
  // } catch (error) {
  //   console.log("unable to update store order error :>> ", error);
  // }
};
