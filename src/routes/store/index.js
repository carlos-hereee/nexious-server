const router = require("express").Router();
const { requireApp } = require("../../middleware/app");
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
const requestSecret = require("./requestSecret");
const editMerch = require("./editMerch");
const editStore = require("./editStore");
const getCustomers = require("./getCustomers");
const checkoutSession = require("./checkoutSession");

const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
const heroWare = [...adminWare, uploadSingle("hero"), saveAsset];
const storeWare = [...adminWare, getStoreWithAppId, requireStore, ...heroWare];
// view store dataz
router.get("/customers", getCustomers);
// add to store
router.post("/build-store/:appId", heroWare, addStore, minAppData);
router.post("/add-merch/:appId", storeWare, addMerch, minAppData);
router.post("/request-secret", requestSecret);
router.post("/create-checkout-session", checkoutSession);
// router.post("/complete-checkout", requestSecret);
// update store
// router.put("/update-store/:appId", heroWare, editStore, minAppData);
router.put("/update-store/:appId", storeWare, editStore, minAppData);
router.put("/update-merch/:appId/:merchId", storeWare, editMerch, minAppData);

module.exports = router;
