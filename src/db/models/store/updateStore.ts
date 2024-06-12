import { UpdateStoreParams } from "@app/store";
import Store from "@db/schema/store";
import { v4 } from "uuid";

export const updateStore = async (params: UpdateStoreParams) => {
  const { accountId, payload, type, order, stripe } = params;
  if (type === "payment" && order && order.user) {
    return await Store.updateOne(
      { accountId },
      {
        $push: {
          pendingOrders: {
            status: "pending",
            client: order.user,
            merch: order.cart,
            paymentMethod: "in-store-and-online",
            orderId: order.orderId || v4(),
          },
        },
      }
    );
  }
  // if (type === "checkout-complete") {
  // }
  if (stripe) return await Store.updateOne({ accountId }, { $set: stripe });
  return await Store.updateOne({ accountId }, { $set: payload });
};
