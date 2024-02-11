import { Router } from "express";
import bodyParser from "body-parser";
import { minAppData } from "../app/getApp/minAppData";
import { addMerch } from "./addMerch";
import { addStore } from "./addStore";
import { editStore } from "./editStore";
import { checkoutSession } from "./checkoutSession";
import { getConfirmation } from "./getConfirmation";
import { stripeWebhook } from "./stripeWebhook";
import { initHook } from "@utils/stripe/webhook/initHook";
import { removeStore } from "./removeStore";
import { getStoreMerch } from "./getStoreMerch";
import { removeMerchendise } from "./removeMerch";
import { getStoreWithName } from "./getStoreWithName";
import { getStripeAccount } from "./getStripeAccount";
import { heroWare } from "@middleware/app";
import { merchWare, storeRemovalWare, storeWare } from "@middleware/store";

const route = Router();
const bodyParse = bodyParser.raw({ type: "application/json" });

// view store dataz
// route.get("/customers", getCustomers);
route.get("/app/:appName", getStoreWithName);
// stripe payments
route.get("/confirm-intent", getConfirmation);
route.get("/account/:accountId", getStripeAccount);
route.get("/inventory/:storeId", getStoreMerch);
// route.post("/request-secret", requestSecret);
// route.post("/create-checkout-session", getCartMerch, checkoutSession);
route.post("/create-checkout-session", checkoutSession);
// add to store
route.post("/build-store/:appId", heroWare, addStore, minAppData);
route.post("/add-merch/:appId", storeWare, addMerch, minAppData);
route.post("/webhook", bodyParse, initHook, stripeWebhook);
// route.post("/complete-checkout", requestSecret);
// update store
// route.put("/update-store/:appId", heroWare, editStore, minAppData);
route.put("/update-store/:appId", storeWare, editStore, minAppData);
// route.put("/update-merch/:appId/:merchId", storeWare, editMerch, minAppData);
// remove store
route.delete("/remove-store/:appId", storeRemovalWare, removeStore, minAppData);
route.delete("/remove-merch/:appId/:merchId", merchWare, removeMerchendise);

export default route;
