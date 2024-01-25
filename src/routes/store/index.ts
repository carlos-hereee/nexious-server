import router from "express";
import bodyParser from "body-parser";
import { getAppWithAppId } from "../../middleware/app/getAppWithAppId.js";
import { saveAsset } from "../../middleware/app/saveAsset.js";
import { validateAdmin } from "../../middleware/app/validateAdmin.js";
import { requireUser } from "@authWare/index.js";
import { getStoreWithAppId } from "../../middleware/store/getStoreWithAppId.js";
import { requireStore } from "../../middleware/store/requireStore.js";
import { minAppData } from "../app/getApp/minAppData.js";
import { addMerch } from "./addMerch.js";
import { addStore } from "./addStore.js";
// import { editMerch } from "./editMerch";
import { editStore } from "./editStore.js";
// import { getCustomers } from "./getCustomers";
import { checkoutSession } from "./checkoutSession.js";
import { getCartMerch } from "./getCartMerch.js";
import { getConfirmation } from "./getConfirmation.js";
import { stripeWebhook } from "./stripeWebhook.js";
import { initHook } from "@stripe/webhook/initHook.js";
import { removeStore } from "./removeStore.js";
import { getStoreMerch } from "./getStoreMerch.js";
import { removeMerchendise } from "./removeMerch.js";
import { getStoreWithName } from "./getStoreWithName.js";
import { getStripeAccount } from "./getStripeAccount.js";
import { uploadSingle } from "@aws/multer.js";
import { requireApp } from "middleware/app/requireApp.js";

const route = router.Router();

const bodyParse = bodyParser.raw({ type: "application/json" });
const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
const heroWare = [...adminWare, uploadSingle("hero"), saveAsset];
const storeWare = [...adminWare, getStoreWithAppId, requireStore, ...heroWare];
const removalWare = [...adminWare, getStoreWithAppId, requireStore];
const merchWare = [requireUser, validateAdmin];
// view store dataz
// route.get("/customers", getCustomers);
route.get("/app/:appName", getStoreWithName);
// stripe payments
route.get("/confirm-intent", getConfirmation);
route.get("/account/:accountId", getStripeAccount);
route.get("/inventory/:storeId", getStoreMerch);
// route.post("/request-secret", requestSecret);
route.post("/create-checkout-session", getCartMerch, checkoutSession);
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
route.delete("/remove-store/:appId", removalWare, removeStore, minAppData);
route.delete("/remove-merch/:appId/:merchId", merchWare, removeMerchendise, minAppData);

export default route;
