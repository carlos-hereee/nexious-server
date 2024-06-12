import { StripeSessionCompleteEvent } from "@app/stripe";
import { getSessionWithId } from "@utils/stripe/payments/getSessionWithId";
import { fulFillOrder } from "./fulfillOrder";

export const checkoutCompleted = async (event: StripeSessionCompleteEvent) => {
  // Handle the checkout.session.completed event
  const sessionComplete = event.data.object;
  if (event.account) {
    const sessionOptions = {
      id: sessionComplete.id,
      // expand line items to full fill order
      options: { expand: ["line_items"] },
      // add connect account
      stripeAccount: { stripeAccount: event.account },
    };
    try {
      // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
      const session = await getSessionWithId(sessionOptions);
      // console.log("session :>> ", session);

      const orderData = { lineItems: session.line_items, accountId: event.account, status: session.payment_status };
      // // Fulfill the purchase...
      await fulFillOrder(orderData);
    } catch (error) {
      // console.log("event :>> ", event);
      // console.log("error :>> ", error);
    }
  }
};
