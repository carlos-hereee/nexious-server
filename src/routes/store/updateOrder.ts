import { StoreRequest } from "types/request";
import { IOrderShema, IStoreSchema } from "types/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { ObjectId } from "mongodb";
import message from "@db/data/error.message.json";
import { updateMerch } from "@db/models/merch/updateMerch";

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
const inCompleteOrders = (store: IStoreSchema, order: IOrderShema, status: "declined" | "accepted", reason: string) => {
  order.status = status;
  order.statusReason = reason;
  // add to incompleted orders
  if (!store.inCompleteOrders) store.inCompleteOrders = [order];
  else store.inCompleteOrders = [...store.inCompleteOrders, order];
};

export const updateOrder = async (req: StoreRequest<{ order: IOrderShema }>, res: Response, next: NextFunction) => {
  try {
    const { orderUpdate, from } = req.params;
    const { orderId, _id } = req.body.order;
    let orderIdx = -1;
    let order: IOrderShema | undefined = undefined;
    if (from === "pending") {
      orderIdx = req.store.pendingOrders.findIndex(
        (p) => p.orderId === orderId || (p._id && (p._id as unknown as ObjectId).toString() === _id)
      );
      order = req.store.pendingOrders[orderIdx];
      // // if order not found
      if (!order || orderIdx < 0) return res.status(400).json(message.orderNotFound).end();
      // remove from pending
      req.store.pendingOrders = req.store.pendingOrders.filter((p) => p !== order);
    }
    if (from === "incomplete") {
      orderIdx = req.store.inCompleteOrders.findIndex(
        (p) => p.orderId === orderId || (p._id && (p._id as unknown as ObjectId).toString() === _id)
      );
      order = req.store.inCompleteOrders[orderIdx];
      // // if order not found
      if (!order || orderIdx < 0) return res.status(400).json(message.orderNotFound).end();
    }
    // move order to imcomplete
    if (orderUpdate === "declined" && order) inCompleteOrders(req.store, order, orderUpdate, "declined");
    if (orderUpdate === "accepted" && order) {
      inCompleteOrders(req.store, order, orderUpdate, "accepted");
      updateInventory(order, "hold");
    }
    // move order to completed
    if (orderUpdate === "completed" && order) {
      order.status = "completed";
      // TODO: ADD PAYMENT CONFIRMATION
      order.merch = order.merch.map((m) => ({ ...m, paymentStatus: "paid" }));
      // add to completed orders
      if (!req.store.completedOrders) req.store.completedOrders = [order];
      else req.store.completedOrders = [...req.store.completedOrders, order];
      // update store inventory
      updateInventory(order, "purchase");
    }
    await req.store.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store order");
  }
};
