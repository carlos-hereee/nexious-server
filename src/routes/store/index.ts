/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { Router } from "express";
import bodyParser from "body-parser";
import { addMerch } from "./addMerch";
import { addStore } from "./addStore";
import { editStore } from "./editStore";
import { checkoutSession } from "./checkout/checkoutSession";
import { getConfirmation } from "./getConfirmation";
import { stripeWebhook } from "./stripe/stripeWebhook";
import { initHook } from "@utils/stripe/webhook/initHook";
import { removeStore } from "./removeStore";
import { removeMerchendise } from "./removeMerch";
import { getStoreWithName } from "./getStoreWithName";
import { getStripeAccount } from "./stripe/getStripeAccount";
import { heroWare } from "@middleware/app";
import { merchWare, merchindiseWare, storeWare } from "@middleware/store";
import { stripeOnboarding } from "./stripe/stripeOnboarding";
import { minStoreData } from "./minStoreData";
import { storeSession } from "./checkout/storeSession";
import { getStoreWithStoreId } from "@middleware/store/getStoreWithStoreId";
import { updateOrder } from "./updateOrder";
import { editMerch } from "./editMerch";
import { editStripeMerch } from "./editStripeMerch";
import { getMerchWithId } from "@middleware/store/getMerchWithId";
import { requireClientData } from "@middleware/store/requireClientData";
import { getStripeAccountBalance } from "./stripe/getStripeAccountBalance";

const route = Router();
const bodyParse = bodyParser.raw({ type: "application/json" });

// view store dataz
// route.get("/customers", getCustomers);
route.get("/app/:appName", getStoreWithName);
// stripe payments
route.get("/confirm-intent", getConfirmation);
route.get("/stripe-account/:appId", storeWare, getStripeAccount, minStoreData);
route.get("/stripe-account/:appId/balance", storeWare, getStripeAccountBalance, minStoreData);
route.get("/inventory/:storeId", getStoreWithStoreId, minStoreData);
// route.post("/request-secret", requestSecret);
// route.post("/create-checkout-session", getCartMerch, checkoutSession);
route.post("/create-checkout-session", requireClientData, checkoutSession);
// request for in store appointments
route.post("/checkout-store-session/:storeId", getStoreWithStoreId, requireClientData, storeSession);
route.post("/stripe-account-link/:appId", storeWare, stripeOnboarding);
// add to store
route.post("/build-store/:appId", heroWare, addStore, minStoreData);
route.post("/add-merch/:appId", storeWare, merchindiseWare, addMerch, minStoreData);
// construct stripe webhook
route.post("/webhook", bodyParse, initHook, stripeWebhook);

// update store
route.put("/update-store/:appId", storeWare, editStore, minStoreData);
// update order details
route.put("/:appId/order/:orderUpdate/from/:from", storeWare, updateOrder, minStoreData);
route.put("/update-merch/:appId/merch/:merchId", storeWare, merchindiseWare, getMerchWithId, editMerch, minStoreData);
route.put("/update-merch/:appId/stripe", storeWare, editStripeMerch, minStoreData);

// remove store
route.delete("/remove-store/:appId", storeWare, removeStore, minStoreData);
route.delete("/remove-merch/:appId/:merchId", merchWare, removeMerchendise);

export default route;
