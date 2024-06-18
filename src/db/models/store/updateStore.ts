import { UpdateStoreParams } from "@app/store";
import Store from "@db/schema/store";
// import { v4 } from "uuid";

export const updateStore = async (params: UpdateStoreParams) => {
  const { accountId, payload, type, order, stripe, orderId } = params;
  if (type === "payment" && order && order.client) {
    return await Store.updateOne(
      { accountId },
      {
        $push: { pendingOrders: order },
      }
    );
  }
  if (type === "checkout-complete" && orderId) {
    // const orderData = ;
    // return await Store.updateOne(
    //   { accountId },
    //   { $pull: { pendingOrders: { orderId } }, $addToSet: { completedOrders: store.pendingOrders[orderIdx] } },
    //   { multi: false }
    // );
  }
  if (stripe) return await Store.updateOne({ accountId }, { $set: stripe });
  return await Store.updateOne({ accountId }, { $set: payload });
};
