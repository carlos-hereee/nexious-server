import { updateMerch } from "@db/models/merch/updateMerch";
import { getStore } from "@db/models/store/getStore";
import Stripe from "stripe";

interface OrderData {
  accountId: string;
  status: "paid" | "unpaid" | "no_payment_required";
  lineItems?: Stripe.ApiList<Stripe.LineItem>;
  metadata?: Stripe.Metadata | null;
}
export const fulFillOrder = async ({ lineItems, accountId, status, metadata }: OrderData) => {
  if (lineItems && status === "paid") {
    if (metadata && metadata.orderId) {
      //  find store
      const store = await getStore({ accountId });
      const orderIdx = store ? store.pendingOrders.findIndex((p) => p.orderId === metadata.orderId) : -1;
      if (store && orderIdx > -1) {
        const orderData = store.pendingOrders[orderIdx];
        if (orderData) {
          // remove from pending
          store.pendingOrders = store.pendingOrders.filter((o) => o.orderId !== metadata.orderId);
          orderData?.status === "accepted";
          // update paid items
          orderData?.merch.map((m) => {
            if (m.productId) return { ...m, paymentStatus: "paid" };
            return m;
          });
          // add to incomplete
          if (store.inCompleteOrders) store.inCompleteOrders = [...store.inCompleteOrders, orderData];
          else store.inCompleteOrders = [orderData];
        }
        await store.save();
      }
      // update merch quantity
      lineItems.data.forEach(async (d) => {
        const quantity = d.quantity || 1;
        // track merch with ids
        const productId = d.price?.product.toString();
        if (productId && quantity) await updateMerch({ merchPurchased: { productId, quantity } });
      });
    }
  }
};
