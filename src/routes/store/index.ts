import router from "express";
import { requireApp } from "../../middleware/app";
import bodyParser from "body-parser";
import { getAppWithAppId } from "../../middleware/app/getAppWithAppId";
import { saveAsset } from "../../middleware/app/saveAsset";
import { validateAdmin } from "../../middleware/app/validateAdmin";
import { requireUser } from "../../middleware/auth";
import { getStoreWithAppId } from "../../middleware/store/getStoreWithAppId";
import { requireStore } from "../../middleware/store/requireStore";
import uploadSingle from "../../utils/multer/uploadSingle";
import { minAppData } from "../app/getApp/minAppData";
import { addMerch } from "./addMerch";
import { addStore } from "./addStore";
import { editMerch } from "./editMerch";
import { editStore } from "./editStore";
import { getCustomers } from "./getCustomers";
import { checkoutSession } from "./checkoutSession";
import { getCartMerch } from "./getCartMerch";
import { getConfirmation } from "./getConfirmation";
import { stripeWebhook } from "./stripeWebhook";
import { initHook } from "@stripe/webhook/initHook";
import { removeStore } from "./removeStore";
import getStoreMerch from "./getStoreMerch";
import { removeMerchendise } from "./removeMerch";
import { getStoreWithName } from "./getStoreWithName";
import getStripeAccount from "./getStripeAccount";

const route = router.Router();

const bodyParse = bodyParser.raw({ type: "application/json" });
const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
const heroWare = [...adminWare, uploadSingle("hero"), saveAsset];
const storeWare = [...adminWare, getStoreWithAppId, requireStore, ...heroWare];
const removalWare = [...adminWare, getStoreWithAppId, requireStore];
const merchWare = [requireUser, validateAdmin];
// view store dataz
route.get("/customers", getCustomers);
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
route.put("/update-merch/:appId/:merchId", storeWare, editMerch, minAppData);
// remove store
route.delete("/remove-store/:appId", removalWare, removeStore, minAppData);
route.delete("/remove-merch/:appId/:merchId", merchWare, removeMerchendise, minAppData);

export = route;
