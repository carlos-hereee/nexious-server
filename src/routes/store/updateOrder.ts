import { StoreRequest } from "@app/request";
import { IOrderShema, IStoreSchema } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { ObjectId } from "mongodb";
import message from "@db/data/error.message.json";
import { updateMerch } from "@db/models/merch/updateMerch";

const updateInventory = (order: IOrderShema) => {
  order.merch.forEach(async (m) => await updateMerch({ merchHold: m }));
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
    const { orderUpdate } = req.params;
    const { orderId, _id } = req.body.order;
    const orderIdx = req.store.pendingOrders.findIndex(
      (p) => p.orderId === orderId || (p._id && (p._id as unknown as ObjectId).toString() === _id)
    );
    // if order not found
    if (orderIdx < 0) return res.status(400).json(message.orderNotFound).end();

    const order = req.store.pendingOrders[orderIdx];
    // remove from pending
    req.store.pendingOrders = req.store.pendingOrders.filter((p) => p !== order);

    // move order to imcomplete
    if (orderUpdate === "declined" && order) inCompleteOrders(req.store, order, orderUpdate, "declined");
    if (orderUpdate === "accepted" && order) {
      inCompleteOrders(req.store, order, orderUpdate, "accepted");
      updateInventory(order);
    }
    // move order to completed
    if (orderUpdate === "completed" && order) {
      order.status = "completed";
      // add to completed orders
      if (!req.store.completedOrders) req.store.completedOrders = [order];
      else req.store.completedOrders = [...req.store.completedOrders, order];
      // update store inventory
      updateInventory(order);
    }
    await req.store.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store order");
  }
};
