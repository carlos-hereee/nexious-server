import { UpdateStoreParams } from "@app/store";
import Store from "@db/schema/store";

export const updateStore = async (params: UpdateStoreParams) => {
  const { accountId, type, order, stripe, orderId, status, storeId } = params;

  if (type === "payment" && order && storeId) {
    return await Store.updateOne({ accountId }, { $push: { orders: order } });
  }
  if (type === "checkout-complete" && orderId && status) {
    return await Store.updateOne({ accountId, "orders.orderId": orderId }, { $set: { "orders.$.status": status } });
  }
  if (type === "checkout-paid" && orderId && status) {
    return await Store.updateOne(
      { accountId, "orders.orderId": orderId },
      // update order status and merchandise payment status
      { $set: { "orders.$.status": status, "orders.$.merch.$[m].paymentStatus": "paid" } },
      // $ne means not equal so if products have product id it will be updated
      { arrayFilters: [{ "m.productId": { $ne: "" } }] }
    );
  }
  if (stripe && accountId) return await Store.updateOne({ accountId }, { $set: stripe });
};
