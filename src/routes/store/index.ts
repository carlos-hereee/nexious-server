/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { Router } from "express";
import bodyParser from "body-parser";
import { addMerch } from "./updates/addMerch";
import { addStore } from "./updates/addStore";
import { editStore } from "./updates/editStore";
import { checkoutSession } from "./checkout/checkoutSession";
import { getConfirmation } from "./stripe/getConfirmation";
import { stripeWebhook } from "./stripe/stripeWebhook";
import { initHook } from "@routes/webhook/initHook";
import { removeStore } from "./updates/removeStore";
import { removeMerchendise } from "./updates/removeMerch";
import { getStripeAccount } from "./stripe/getStripeAccount";
import { adminWare } from "@middleware/app";
import { merchWare, merchindiseWare, storeWare } from "@middleware/store";
import { storeSession } from "./checkout/storeSession";
import { getStoreWithStoreId } from "@middleware/store/getStoreWithStoreId";
import { updateOrder } from "./updates/updateOrder";
import { editMerch } from "./updates/editMerch";
import { editStripeMerch } from "./updates/editStripeMerch";
import { getMerchWithId } from "@middleware/store/getMerchWithId";
import { requireClientData } from "@middleware/store/requireClientData";
import { getStripeAccountBalance } from "./stripe/getStripeAccountBalance";
import { managePayouts } from "./stripe/managePayouts";
import { minAppData } from "@routes/minAppData";
import { getBillingPortal } from "./checkout/getBillingPortal";
import { trackOrder } from "./checkout/trackOrder";
import { getWebhooks } from "./stripe/getWebhooks";
import { createAccount } from "./stripe/createAccount";
import { stripeOnboarding } from "./stripe/stripeOnboarding";
import { postReview } from "./merch/postReview";
import { requireUser } from "@middleware/auth/requireUser";
import { requireMessage } from "@middleware/app/requireMessage";
import { postMessageReply } from "@middleware/app/postMessageReply";

const route = Router();
const bodyParse = bodyParser.raw({ type: "application/json" });

// stripe payments
route.get("/confirm-intent", getConfirmation);
route.get("/:accountId/track-order/:orderId", trackOrder);
route.get("/merch/:merchId", getMerchWithId, minAppData);
route.get("/stripe-billing-portal/:customer", getBillingPortal);
route.get("/stripe-account/:appId", storeWare, getStripeAccount, minAppData);
route.get("/stripe-account/:appId/balance", storeWare, getStripeAccountBalance, minAppData);
route.get("/inventory/:storeId", getStoreWithStoreId, minAppData);
// manage stripe payouts
route.post("/stripe-account/:appId/payouts/:option", storeWare, managePayouts, minAppData);
// route.post("/request-secret", requestSecret);
route.post("/create-checkout-session", requireClientData, checkoutSession);
// request for in store appointments
route.post("/checkout-store-session/:storeId", getStoreWithStoreId, requireClientData, storeSession);
route.post("/stripe-account-link/:appId", storeWare, stripeOnboarding);
// user actions
route.post("/merch/:merchId/review", requireUser, getMerchWithId, postReview, minAppData);
route.post("/message/:messageId", requireUser, requireMessage, postMessageReply, minAppData);
// add to store
route.post("/build-store/:appId", adminWare, addStore, minAppData);
route.post("/build-stripe-store/:appId", storeWare, createAccount, minAppData);
route.post("/add-merch/:appId", storeWare, merchindiseWare, addMerch, minAppData);
// construct stripe webhook
route.post("/webhook", bodyParse, initHook, stripeWebhook);
route.get("/webhook", getWebhooks);

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
