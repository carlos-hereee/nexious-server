import { UpdateStoreParams } from "@app/store";
import Store from "@db/schema/store";
// import { v4 } from "uuid";

export const updateStore = async (params: UpdateStoreParams) => {
  const { accountId, type, order, stripe, orderId, status, storeId } = params;

  if (type === "payment" && order && storeId) {
    return await Store.updateOne({ accountId }, { $push: { orders: order } });
  }
  if (type === "checkout-complete" && orderId && status) {
    return await Store.updateOne(
      { accountId, "pendingOrders.orderId": orderId },
      { $set: { "pendingOrders.$.status": status } }
    );
  }
  if (stripe && accountId) return await Store.updateOne({ accountId }, { $set: stripe });
};
