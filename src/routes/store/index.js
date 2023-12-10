const router = require("express").Router();
const { requireApp } = require("../../middleware/app");
const getAppWithAppId = require("../../middleware/app/getAppWithAppId");
const saveAsset = require("../../middleware/app/saveAsset");
const validateAdmin = require("../../middleware/app/validateAdmin");
const { requireUser } = require("../../middleware/auth");
const uploadSingle = require("../../utils/multer/uploadSingle");
const minAppData = require("../app/getApp/minAppData");
const addStore = require("./addStore");
const getCustomers = require("./getCustomers");

const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
const heroWare = [...adminWare, uploadSingle("hero"), saveAsset];
// view store dataz
router.get("/customers", getCustomers);
// add to store
router.post("/build-store/:appId", heroWare, addStore, minAppData);

module.exports = router;
