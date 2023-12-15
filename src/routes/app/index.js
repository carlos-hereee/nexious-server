const router = require("express").Router();
const { requireApp } = require("../../middleware/app");
const saveAsset = require("../../middleware/app/saveAsset");
const { requireUser } = require("../../middleware/auth");
const addPage = require("./pages/addPage");
const deleteApp = require("./deleteApp");
const initApp = require("./initApp");
const getAppWithName = require("./getApp/getAppWithName");
const updateLandingPage = require("./updateApp/landingPage");
const validateAdmin = require("../../middleware/app/validateAdmin");
const uploadSingle = require("../../utils/multer/uploadSingle");
const updateAppLogo = require("./updateApp/appLogo");
const requireUniqueName = require("../../middleware/app/requireUniqueName");
const getAppList = require("./getApp/appList");
const requireAppName = require("../../middleware/app/requireAppName");
const minAppData = require("./getApp/minAppData");
const getAppWithAppId = require("../../middleware/app/getAppWithAppId");
const getAppWithLanguage = require("./getApp/getAppWithLanguage");
const uploadFields = require("../../utils/multer/uploadFields");
const updateNewsletter = require("./updateApp/updateNewsletter");
const deletePage = require("./pages/deletePage");
const updatePage = require("./pages/updatePage");
const requirePage = require("../../middleware/pages/requirePage");
// media
const updateMedias = require("./media/updateMedias");
const addMedia = require("./media/addMedia");
const removeMedia = require("./media/removeMedia.");
const subscribe = require("./updateApp/subscribe");
const unsubscribe = require("./updateApp/unsubscribe");
const userData = require("../../middleware/auth/userData");

// one liner
const logoWare = [requireUser, validateAdmin, getAppWithAppId, uploadSingle("logo"), saveAsset];
const initAppWare = [requireUser, uploadSingle("logo"), requireAppName, requireUniqueName];
const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
const userWare = [requireUser, getAppWithAppId, requireApp];
const heroWare = [...adminWare, uploadSingle("hero")];
const multiHeroWare = [...adminWare, uploadFields()];

// load app data
router.get("/app-list", getAppList);
router.get("/:appName", getAppWithName);
// router.get("/latest/:appId", requireUser, latest);
router.get("/:appName/locale/:locale", requireUser, getAppWithLanguage);
// build app data
router.post("/init-app", initAppWare, saveAsset, initApp, minAppData);
// user subscrition
router.post("/subscribe/:appId", userWare, subscribe, userData);
router.post("/unsubscribe/:appId", userWare, unsubscribe, userData);
// update app
router.post("/update-newsletter/:appId", heroWare, saveAsset, updateNewsletter, minAppData);
router.post("/update-medias/:appId", heroWare, saveAsset, updateMedias, minAppData);
router.post("/update-app-name/:appId", logoWare, updateAppLogo, minAppData);
router.post("/update-landing-page/:appId", multiHeroWare, updateLandingPage, minAppData);
router.post("/update-page/:appId/page/:pageId", multiHeroWare, requirePage, updatePage, minAppData);
// building pages
router.post("/add-page/:appId", multiHeroWare, addPage, minAppData);
router.post("/add-media/:appId", adminWare, addMedia, minAppData);
// delete app
router.delete("/delete-app/:appId", adminWare, deleteApp, minAppData);
router.delete("/delete-page/:appId/page/:pageId", adminWare, deletePage, minAppData);
router.delete("/delete-media/:appId/media/:assetId", adminWare, removeMedia, minAppData);

module.exports = router;
