import Stripe from "stripe";
import { getSessionWithId } from "../payments/getSessionWithId";
import { updateMerch } from "@db/models/merch/updateMerch";
import { CheckoutCompleteSession } from "@app/stripe";
import { formatNotification } from "@utils/app/format/formatNotification";
import { updateApp } from "@db/models/app/updateApp";
import { createNotification } from "@db/models/notification/createNotification";
import { getStore } from "@db/models/store/getStore";

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
  // find store
  const store = await getStore({ accountId });
  // create notification
  const notification = formatNotification({ type: "order-paid" });
  const n = await createNotification(notification);
  if (store) {
    // link notification to app
    const app = await updateApp({ id: store.appId, type: "add-notification", notificationId: n._id });
    console.log("app :>> ", app);
    // find order
    const orderIdx = store.orders.findIndex((order) => order.orderId === orderId);
    const targetOrder = store.orders[orderIdx];
    if (orderIdx >= 0 && targetOrder) {
      // update order status
      targetOrder.status = "accepted";
      targetOrder.merch = targetOrder.merch.map((m) => {
        // change payment status to paid if merch contains a productid
        if (m.productId) return { ...m, paymentStatus: "paid" };
        return m;
      });
      console.log("store.orders[orderIdx] :>> ", store.orders[orderIdx]);
      // save to db
      await store.save();
    }
  }
};

export const completeCheckoutOrder = async ({ accountId, sessionId, orderId }: CheckoutCompleteSession) => {
  const session = await generateSession(sessionId, accountId);
  // update merch quantity
  if (session.line_items) updateMerchQuantity(session.line_items);
  if (orderId) await completeCheckout(accountId, orderId);
};

// 	The customer’s payment succeeded.
export const fulFillOrder = async (event: Stripe.CheckoutSessionAsyncPaymentSucceededEvent) => {
  // track account id
  const accountId = event.account;
  const { id, metadata } = event.data.object;
  if (accountId) {
    const orderId = metadata ? metadata.orderId : undefined;
    await completeCheckoutOrder({ accountId, sessionId: id, orderId });
  }
};
