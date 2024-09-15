/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { Router } from "express";
import { addMerch } from "./updates/addMerch";
import { addStore } from "./updates/addStore";
import { editStore } from "./updates/editStore";
import { checkoutSession } from "./checkout/checkoutSession";
import { removeStore } from "./updates/removeStore";
import { removeMerchendise } from "./updates/removeMerch";
import { adminWare } from "@middleware/app";
import { merchWare, merchindiseWare, storeWare } from "@middleware/store";
import { storeSession } from "./checkout/storeSession";
import { getStoreWithStoreId } from "@middleware/store/getStoreWithStoreId";
import { updateOrder } from "./updates/updateOrder";
import { editMerch } from "./updates/editMerch";
import { editStripeMerch } from "./updates/editStripeMerch";
import { getMerchWithId } from "@middleware/store/getMerchWithId";
import { requireClientData } from "@middleware/store/requireClientData";
import { minAppData } from "@routes/minAppData";
import { trackOrder } from "./checkout/trackOrder";
import { postReview } from "./merch/postReview";
import { requireUser } from "@middleware/auth/requireUser";
import { requireMessage } from "@middleware/app/requireMessage";
import { postMessageReply } from "@middleware/app/postMessageReply";

const route = Router();

// stripe payments
route.get("/:accountId/track-order/:orderId", trackOrder);
route.get("/merch/:merchId", getMerchWithId, minAppData);
route.get("/inventory/:storeId", getStoreWithStoreId, minAppData);
// route.post("/request-secret", requestSecret);
route.post("/create-checkout-session", requireClientData, checkoutSession);
// request for in store appointments
route.post("/checkout-store-session/:storeId", getStoreWithStoreId, requireClientData, storeSession);
// user actions
route.post("/merch/:merchId/review", requireUser, getMerchWithId, postReview, minAppData);
route.post("/message/:messageId", requireUser, requireMessage, postMessageReply, minAppData);
// add to store
route.post("/build-store/:appId", adminWare, addStore, minAppData);
route.post("/add-merch/:appId", storeWare, merchindiseWare, addMerch, minAppData);

// update store
route.put("/update-store/:appId", storeWare, editStore, minAppData);
// update order details
route.put("/:appId/order/:orderUpdate/from/:from", storeWare, updateOrder, minAppData);
route.put("/update-merch/:appId/merch/:merchId", storeWare, merchindiseWare, getMerchWithId, editMerch, minAppData);
route.put("/update-merch/:appId/stripe", storeWare, editStripeMerch, minAppData);

// remove store
route.delete("/remove-store/:appId", storeWare, removeStore, minAppData);
route.delete("/remove-merch/:appId/:merchId", merchWare, removeMerchendise);

export default route;
