import Stripe from "stripe";
import { getSessionWithId } from "../payments/getSessionWithId";
import { updateMerch } from "@db/models/merch/updateMerch";
import { CheckoutCompleteSession } from "types/stripe";
import { updateApp } from "@db/models/app/updateApp";
import { getStore } from "@db/models/store/getStore";
import { addNotification } from "@utils/app/addNotification";

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
  const n = await addNotification("order-paid");
  if (store) {
    // link notification to app
    await updateApp({ id: store.appId, type: "add-notification", notificationId: n._id });
    store.orders = store.orders.map((order) => {
      // // find order
      if (order.orderId === orderId) {
        // update order status
        order.status = "accepted";
        order.merch = order.merch.map((m) => {
          // change payment status to paid if merch contains a productid
          if (m.productId) return { ...m, paymentStatus: "paid" };
          return m;
        });
      }
      return order;
    });
    // save to db
    await store.save();
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
