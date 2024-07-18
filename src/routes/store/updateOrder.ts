import type { StoreRequest } from "@app/request";
import type { IOrderShema } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import message from "@db/data/error.message.json";
import { updateMerch } from "@db/models/merch/updateMerch";
import { getOrder } from "@db/models/store/getStore";

const updateInventory = (order: IOrderShema, type: "purchase" | "hold") => {
  // TODO: TEST MERCH IN STOCK CHANGES
  if (type === "hold") {
    order.merch.forEach(async (m) => {
      if (m.paymentStatus === "unpaid") await updateMerch({ merchHold: m });
    });
  }
  if (type === "purchase") {
    order.merch.forEach(async (m) => {
      if (m.paymentStatus === "unpaid") await updateMerch({ merchHold: m });
      if (m.paymentStatus === "paid") await updateMerch({ releaseHold: m });
    });
  }
};
// const inCompleteOrders = (store: IStoreSchema, order: IOrderShema, status: "declined" | "accepted", reason: string) => {
//   order.status = status;
//   order.statusReason = reason;
//   // add to incompleted orders
//   if (!store.inCompleteOrders) store.inCompleteOrders = [order];
//   else store.inCompleteOrders = [...store.inCompleteOrders, order];
// };

export const updateOrder = async (req: StoreRequest<{ order: IOrderShema }>, res: Response, next: NextFunction) => {
  try {
    const { orderUpdate } = req.params;
    const { orderId } = req.body.order;
    const order = await getOrder({ orderId: orderId || "" });
    if (!order) return res.status(400).json(message.orderNotFound).end();
    if (order) {
      // if (from === "pending") {
      //   // orderIdx = req.store.pendingOrders.findIndex(
      //   //   (p) => p.orderId === orderId || (p._id && (p._id as unknown as ObjectId).toString() === _id)
      //   // );
      //   // order = req.store.pendingOrders[orderIdx];
      //   // // if order not found
      //   // remove from pending
      //   // req.store.pendingOrders = req.store.pendingOrders.filter((p) => p !== order);
      // }
      // if (from === "incomplete") {
      //   orderIdx = req.store.inCompleteOrders.findIndex(
      //     (p) => p.orderId === orderId || (p._id && (p._id as unknown as ObjectId).toString() === _id)
      //   );
      //   order = req.store.inCompleteOrders[orderIdx];
      // }
      // move order to imcomplete
      if (orderUpdate === "accepted") updateInventory(order, "hold");
      // update order status
      order.status = orderUpdate;
      order.merch = order.merch.map((m) => ({ ...m, paymentStatus: "paid" }));
      // update store inventory
      updateInventory(order, "purchase");
      // save to db
      await order.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store order");
  }
};
