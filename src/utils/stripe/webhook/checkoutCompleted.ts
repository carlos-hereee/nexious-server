// import { StripeSessionCompleteEvent } from "@app/stripe";
// import { getSessionWithId } from "@utils/stripe/payments/getSessionWithId";
// import { fulFillOrder } from "./fulfillOrder";
import Stripe from "stripe";

export const checkoutCompleted = async (event: Stripe.CheckoutSessionCompletedEvent) => {
  // Handle the checkout.session.completed event
  const accountId = event.account;
  if (event.account) {
    try {
      // Save an order in your database, marked as 'awaiting payment'
    } catch (error) {
      // console.log("event :>> ", event);
      // console.log("error :>> ", error);
    }
  }
};
