import { StripeSessionCompleteEvent } from "@app/stripe";
import { getSessionWithId } from "@utils/stripe/payments/getSessionWithId";

export const checkoutCompleted = async (event: StripeSessionCompleteEvent) => {
  // Handle the checkout.session.completed event
  const sessionComplete = event.data.object;
  // console.log(`Checkout session was successful!`, sessionComplete);
  const sessionOptions = {
    id: sessionComplete.id,
    options: { expand: ["line_items"] },
  };
  // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
  const session = await getSessionWithId(sessionOptions);
  console.log("session :>> ", session);
  // const lineItems = sessionWithLineItems.line_items;

  // // Fulfill the purchase...
  // fulFillOrder(lineItems);
};
