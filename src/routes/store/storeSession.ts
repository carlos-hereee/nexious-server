import { StoreRequest } from "@app/request";
import { IOrderShema, StoreSessionBody } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Response } from "express";
import message from "@db/data/error.message.json";
import { updateStore } from "@db/models/store/updateStore";
import { v4 } from "uuid";

export const storeSession = async (req: StoreRequest<StoreSessionBody>, res: Response) => {
  try {
    const { cart, client } = req.body;
    // require param data
    if (!client || !client.email || !client.phone) return res.status(400).json(message.missingClientData).end();
    if (!req.store || !req.store.storeId) return res.status(404).json(message.storeNotFound).end();
    const { storeId, email, location, location2, accountId } = req.store;
    const store = { storeId, email, location: location || "", location2: location2 || "" };
    // format order data
    const order: IOrderShema = { store, client, merch: cart, orderId: v4() };
    // add order to store pending order
    await updateStore({ type: "payment", order, accountId: accountId || "" });

    res.status(200).json(order).end();
  } catch (error) {
    return useGenericErrors(res, error, "unable to create store session");
  }
};
