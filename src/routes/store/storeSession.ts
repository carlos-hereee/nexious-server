import { StoreRequest } from "@app/request";
import { IOrderShema, StoreSessionBody } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { NextFunction, Response } from "express";
import message from "@db/data/error.message.json";

export const storeSession = async (req: StoreRequest<StoreSessionBody>, res: Response, next: NextFunction) => {
  try {
    const { cart, client } = req.body;
    // require param data
    if (!client || !client.email || !client.phone) return res.status(400).json(message.missingClientData).end();
    if (req.store.storeId) {
      // format order data
      const order: IOrderShema = { storeId: req.store.storeId, status: "pending", client, merch: cart };
      // add order to store pending order
      if (!req.store.pendingOrders) req.store.pendingOrders = [order];
      else req.store.pendingOrders.push(order);
      // save order to store db
      await req.store.save();
    }
    next();
  } catch (error) {
    return useGenericErrors(res, error, "unable to create stripe session");
  }
};
