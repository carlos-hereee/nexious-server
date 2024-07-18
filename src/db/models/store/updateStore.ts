import type { UpdateStoreParams } from "@app/store";
import Store from "@db/schema/store";

export const updateStore = async (params: UpdateStoreParams) => {
  const { accountId, type, order, stripe, orderId, status, storeId, notification } = params;

  if (type === "payment" && order) {
    return await Store.updateOne({ storeId }, { $addToSet: { orders: order } });
  }
  if (type === "add-notification" && order) {
    return await Store.updateOne({ storeId }, { $addToSet: { notifications: notification } });
  }
  if (type === "payment-in-store" && order) {
    return await Store.updateOne({ storeId }, { $addToSet: { orders: order } });
  }
  if (type === "checkout-complete" && orderId && status) {
    return await Store.updateOne({ accountId, "orders.orderId": orderId }, { $set: { "orders.$.status": status } });
  }

  if (stripe && accountId) return await Store.updateOne({ accountId }, { $set: stripe });
};
