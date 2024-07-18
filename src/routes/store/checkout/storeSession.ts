import type { StoreRequest } from "@app/request";
import type { StoreSessionBody } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Response } from "express";
import { updateStore } from "@db/models/store/updateStore";
import { updateApp } from "@db/models/app/updateApp";
import { addNotification } from "@utils/app/addNotification";
import Orders from "@db/schema/order";

export const storeSession = async (req: StoreRequest<StoreSessionBody>, res: Response) => {
  try {
    const { cart } = req.body;
    const { storeId, email, location, location2, appId } = req.store;
    const store = { storeId, email, location: location || "", location2: location2 || "" };

    // format order data
    const order = await Orders.create({ ...req.body, status: "pending", merch: cart, store, paymentMethod: "in-store" });
    // link order to user and store
    if (order) {
      if (req.user) {
        req.user.orders.push(order._id);
        await req.user.save();
      }
      await updateStore({ order: order._id, storeId, type: "payment-in-store" });
    }
    // create notification
    const n = await addNotification({ type: "order-in-store", message: `An order was submited` });
    await updateApp({ id: appId, type: "add-notification", notificationId: n._id });

    res.status(200).json(order).end();
  } catch (error) {
    return useGenericErrors(res, error, "unable to create store session");
  }
};
