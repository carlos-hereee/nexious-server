const router = require("express").Router();
const { getApp, requireApp } = require("../../middleware/app");
const saveAsset = require("../../middleware/app/saveAsset");
const { requireUser } = require("../../middleware/auth");
const addPage = require("./addPage");
const deleteApp = require("./deleteApp");
const initApp = require("./initApp");
const latest = require("./getApp/latest");
const updateApp = require("./updateApp/app");
const getAppWithName = require("./getApp/getAppWithName");
// const updateAppName = require("../../middleware/app/updateAppName");
const updateLandingPage = require("./updateApp/landingPage");
const validateAdmin = require("../../middleware/app/validateAdmin");
const uploadSingle = require("../../utils/multer/uploadSingle");
const updateAppLogo = require("./updateApp/appLogo");
const initAppLogo = require("../../middleware/app/updateLogo");
const requireUniqueName = require("../../middleware/app/requireUniqueName");
const getAppList = require("./getApp/appList");
const requireAppName = require("../../middleware/app/requireAppName");
const minAppData = require("./getApp/appData");
const landingPageWithSection = require("./updateApp/landingPageWithSection");
const getAppWithAppId = require("../../middleware/app/getAppWithAppId");
const getAppWithLanguage = require("./getApp/getAppWithLanguage");
const uploadFields = require("../../utils/multer/uploadFields");

// one liner
const appWare = [getApp, requireApp];
const logoWare = [requireUser, uploadSingle("logo")];
const initAppWare = [...logoWare, requireAppName, requireUniqueName];
const adminWare = [requireUser, validateAdmin];
const heroWare = [...adminWare, uploadSingle("hero"), getAppWithAppId, requireApp];
// const landingWare = [landingPageWithSection, minAppData];
const multiHeroWare = [...adminWare, uploadFields(), getAppWithAppId, requireApp];

// load app data
router.get("/app-list", getAppList);
router.get("/:appName", requireUser, getAppWithName);
router.get("/latest/:appId", requireUser, latest);
router.get("/:appName/locale/:locale", requireUser, getAppWithLanguage);
// build app data
router.post("/init-app/:appName", initAppWare, initAppLogo, initApp, minAppData);
// update app
router.post("/update-app", validateAdmin, updateApp);
router.post("/update-app-name/:appId", logoWare, updateAppLogo);
router.post("/update-landing-page/:appId", multiHeroWare, updateLandingPage, minAppData);
router.post("/update-landing-page-with-hero/:appId", heroWare, landingPageWithSection);
// building pages
router.post("/add-page", appWare, saveAsset, addPage);
// delete app
router.delete("/delete-app/:appId", adminWare, deleteApp);

module.exports = router;
