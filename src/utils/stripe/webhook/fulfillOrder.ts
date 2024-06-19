import Stripe from "stripe";
import { getSessionWithId } from "../payments/getSessionWithId";
import { updateMerch } from "@db/models/merch/updateMerch";
import { updateStore } from "@db/models/store/updateStore";

// 	The customer’s payment succeeded.
export const fulFillOrder = async (event: Stripe.CheckoutSessionAsyncPaymentSucceededEvent) => {
  console.log("fulling order :>> ", event);
  const accountId = event.account;
  const sessionComplete = event.data.object;
  const metadata = event.data.object.metadata;

  // // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
  const session = await getSessionWithId({
    id: sessionComplete.id,
    // expand line items to full fill order
    options: { expand: ["line_items"] },
    // add connect account
    stripeAccount: { stripeAccount: accountId },
  });
  if (session.line_items && accountId && metadata && metadata.orderId) {
    console.log("session :>> ", session);
    await updateStore({
      orderId: metadata.orderId,
      accountId,
      type: "checkout-complete-paid",
      status: "accepted",
      paymentStatus: "paid",
    });
    // update merch quantity
    session.line_items.data.forEach(async (d) => {
      const quantity = d.quantity || 1;
      // track merch with ids
      const productId = d.price?.product.toString();
      if (productId && quantity) await updateMerch({ merchPurchased: { productId, quantity } });
    });
  }
};
