const router = require("express").Router();
const { requireApp } = require("../../middleware/app");
const bodyParser = require("body-parser");
const getAppWithAppId = require("../../middleware/app/getAppWithAppId");
const saveAsset = require("../../middleware/app/saveAsset");
const validateAdmin = require("../../middleware/app/validateAdmin");
const { requireUser } = require("../../middleware/auth");
const getStoreWithAppId = require("../../middleware/store/getStoreWithAppId");
const requireStore = require("../../middleware/store/requireStore");
const uploadSingle = require("../../utils/multer/uploadSingle");
const minAppData = require("../app/getApp/minAppData");
const addMerch = require("./addMerch");
const addStore = require("./addStore");
const editMerch = require("./editMerch");
const editStore = require("./editStore");
const getCustomers = require("./getCustomers");
const checkoutSession = require("./checkoutSession");
const getCartMerch = require("./getCartMerch");
const getConfirmation = require("./getConfirmation");
const stripeWebhook = require("./stripeWebhook");
const initHook = require("../../utils/stripe/webhook/initHook");
const removeStore = require("./removeStore");
const getStoreMerch = require("./getStoreMerch");
const removeMerch = require("./removeMerch");

const bodyParse = bodyParser.raw({ type: "application/json" });
const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
const heroWare = [...adminWare, uploadSingle("hero"), saveAsset];
const storeWare = [...adminWare, getStoreWithAppId, requireStore, ...heroWare];
const removalWare = [...adminWare, getStoreWithAppId, requireStore];
const merchWare = [requireUser, validateAdmin];
// view store dataz
router.get("/customers", getCustomers);
// stripe payments
router.get("/confirm-intent", getConfirmation);
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
