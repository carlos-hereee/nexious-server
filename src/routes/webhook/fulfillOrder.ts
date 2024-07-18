import S from "stripe";
import { getCheckoutSession } from "../../utils/stripe/payments/getCheckoutSession";
import { updateMerch } from "@db/models/merch/updateMerch";
import type { CheckoutCompleteSession } from "@app/stripe";
import { getOrder } from "@db/models/store/getStore";
import { addNotification } from "@utils/app/addNotification";
import { OrderMerchSchema } from "@app/store";
import { updateStore } from "@db/models/store/updateStore";

// // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
const generateSession = async (id: string, stripeAccount: string) => {
  return await getCheckoutSession({
    id,
    // expand line items to full fill order
    options: { expand: ["line_items"] },
    // add connect account
    stripeAccount: { stripeAccount },
  });
};
// update merch quantity
const updateMerchQuantity = (lineItems: S.ApiList<S.LineItem>) => {
  lineItems.data.forEach(async (d) => {
    const quantity = d.quantity || 1;
    // track merch with ids
    const productId = d.price?.product.toString();
    if (productId && quantity) await updateMerch({ merchPurchased: { productId, quantity } });
  });
};
// finish checkout send notification and update store order
const completeCheckout = async (orderId: string, session: S.Response<S.Checkout.Session>) => {
  // find store
  const order = await getOrder({ orderId });
  // create notification
  const n = await addNotification({ type: "order-paid", message: "An order has been paid" });
  if (order && order.store?.storeId) {
    // link notification to app
    await updateStore({ storeId: order.store.storeId, type: "add-notification", notification: n._id });
    // update order status
    order.status = "accepted";
    // attach customer details to order
    if (session.customer_details) {
      order.client.name = session.customer_details.name || "";
      order.client.email = session.customer_details.email || "";
      order.client.address = {
        city: session.customer_details.address?.city || "",
        country: session.customer_details.address?.country || "",
        line1: session.customer_details.address?.line1 || "",
        line2: session.customer_details.address?.line2 || "",
        postal_code: session.customer_details.address?.postal_code || "",
        state: session.customer_details.address?.state || "",
      };
    }
    order.merch = order.merch.map((m: OrderMerchSchema) => {
      // change payment status to paid if merch contains a productid
      if (m.productId) return { ...m, paymentStatus: "paid" };
      return m;
    });
    // save to db
    await order.save();
  }
};

export const completeCheckoutOrder = async ({ accountId, sessionId, orderId }: CheckoutCompleteSession) => {
  const session = await generateSession(sessionId, accountId);
  // update merch quantity
  if (session.line_items) updateMerchQuantity(session.line_items);
  if (orderId) await completeCheckout(orderId, session);
};

// 	The customer’s payment succeeded.
export const fulFillOrder = async (event: S.CheckoutSessionAsyncPaymentSucceededEvent) => {
  // track account id
  const accountId = event.account;
  const { id, metadata } = event.data.object;
  if (accountId) {
    const orderId = metadata ? metadata.orderId : undefined;
    await completeCheckoutOrder({ accountId, sessionId: id, orderId });
  }
};
