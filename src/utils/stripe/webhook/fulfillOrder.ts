import Stripe from "stripe";
import { getSessionWithId } from "../payments/getSessionWithId";
import { updateMerch } from "@db/models/merch/updateMerch";
import { updateStore } from "@db/models/store/updateStore";
import { CheckoutCompleteSession } from "@app/stripe";
import { formatNotification } from "@utils/app/format/formatNotification";
import { updateApp } from "@db/models/app/updateApp";

// // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
const generateSession = async (id: string, stripeAccount: string) => {
  return await getSessionWithId({
    id,
    // expand line items to full fill order
    options: { expand: ["line_items"] },
    // add connect account
    stripeAccount: { stripeAccount },
  });
};
// update merch quantity
const updateMerchQuantity = (lineItems: Stripe.ApiList<Stripe.LineItem>) => {
  lineItems.data.forEach(async (d) => {
    const quantity = d.quantity || 1;
    // track merch with ids
    const productId = d.price?.product.toString();
    if (productId && quantity) await updateMerch({ merchPurchased: { productId, quantity } });
  });
};
// finish checkout send notification and update store order
const completeCheckout = async (accountId: string, orderId: string) => {
  const notification = formatNotification({ type: "order-paid" });
  await updateApp({ accountId, type: "add-notification", notification });
  await updateStore({ orderId, accountId, type: "checkout-paid", status: "accepted", notification });
};

export const completeCheckoutOrder = async ({ accountId, sessionId, orderId }: CheckoutCompleteSession) => {
  const session = await generateSession(sessionId, accountId);
  console.log("session :>> ", session);
  // update merch quantity
  if (session.line_items) updateMerchQuantity(session.line_items);
  if (orderId) await completeCheckout(accountId, orderId);
};

// 	The customer’s payment succeeded.
export const fulFillOrder = async (event: Stripe.CheckoutSessionAsyncPaymentSucceededEvent) => {
  console.log("fulling order :>> ", event);
  // track account id
  const accountId = event.account;
  const { id, metadata } = event.data.object;
  if (accountId) {
    const orderId = metadata ? metadata.orderId : undefined;
    await completeCheckoutOrder({ accountId, sessionId: id, orderId });
  }
};
