import router  from "express".Router();
import { requireApp }  from "../../middleware/app";
import bodyParser  from "body-parser";
import getAppWithAppId  from "../../middleware/app/getAppWithAppId";
import saveAsset  from "../../middleware/app/saveAsset";
import validateAdmin  from "../../middleware/app/validateAdmin";
import { requireUser }  from "../../middleware/auth";
import getStoreWithAppId  from "../../middleware/store/getStoreWithAppId";
import requireStore  from "../../middleware/store/requireStore";
import uploadSingle  from "../../utils/multer/uploadSingle";
import minAppData  from "../app/getApp/minAppData";
import addMerch  from "./addMerch";
import addStore  from "./addStore";
import editMerch  from "./editMerch";
import editStore  from "./editStore";
import getCustomers  from "./getCustomers";
import checkoutSession  from "./checkoutSession";
import getCartMerch  from "./getCartMerch";
import getConfirmation  from "./getConfirmation";
import stripeWebhook  from "./stripeWebhook";
import initHook  from "../../utils/stripe/webhook/initHook";
import removeStore  from "./removeStore";
import getStoreMerch  from "./getStoreMerch";
import removeMerch  from "./removeMerch";
import getStoreWithName  from "./getStoreWithName";
import getStripeAccount  from "./getStripeAccount";

const bodyParse = bodyParser.raw({ type: "application/json" });
const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
const heroWare = [...adminWare, uploadSingle("hero"), saveAsset];
const storeWare = [...adminWare, getStoreWithAppId, requireStore, ...heroWare];
const removalWare = [...adminWare, getStoreWithAppId, requireStore];
const merchWare = [requireUser, validateAdmin];
// view store dataz
router.get("/customers", getCustomers);
router.get("/app/:appName", getStoreWithName);
// stripe payments
router.get("/confirm-intent", getConfirmation);
router.get("/account/:accountId", getStripeAccount);
router.get("/inventory/:storeId", getStoreMerch);
// router.post("/request-secret", requestSecret);
router.post("/create-checkout-session", getCartMerch, checkoutSession);
// add to store
router.post("/build-store/:appId", heroWare, addStore, minAppData);
router.post("/add-merch/:appId", storeWare, addMerch, minAppData);
router.post("/webhook", bodyParse, initHook, stripeWebhook);
// router.post("/complete-checkout", requestSecret);
// update store
// router.put("/update-store/:appId", heroWare, editStore, minAppData);
router.put("/update-store/:appId", storeWare, editStore, minAppData);
router.put("/update-merch/:appId/:merchId", storeWare, editMerch, minAppData);
// remove store
router.delete("/remove-store/:appId", removalWare, removeStore, minAppData);
router.delete("/remove-merch/:appId/:merchId", merchWare, removeMerch, minAppData);

module.exports = router;
