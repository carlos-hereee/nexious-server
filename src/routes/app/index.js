const router = require("express").Router();
const { requireApp } = require("../../middleware/app");
const saveAsset = require("../../middleware/app/saveAsset");
const { requireUser } = require("../../middleware/auth");
const addPage = require("./pages/addPage");
const deleteApp = require("./deleteApp");
const initApp = require("./initApp");
// const updateApp = require("./updateApp/app");
const getAppWithName = require("./getApp/getAppWithName");
// const updateAppName = require("../../middleware/app/updateAppName");
const updateLandingPage = require("./updateApp/landingPage");
const validateAdmin = require("../../middleware/app/validateAdmin");
const uploadSingle = require("../../utils/multer/uploadSingle");
const updateAppLogo = require("./updateApp/appLogo");
// const updateLogo = require("../../middleware/app/updateLogo");
const requireUniqueName = require("../../middleware/app/requireUniqueName");
const getAppList = require("./getApp/appList");
const requireAppName = require("../../middleware/app/requireAppName");
const minAppData = require("./getApp/minAppData");
// const landingPageWithSection = require("./updateApp/landingPageWithSection");
const getAppWithAppId = require("../../middleware/app/getAppWithAppId");
const getAppWithLanguage = require("./getApp/getAppWithLanguage");
const uploadFields = require("../../utils/multer/uploadFields");
const updateNewsletter = require("./updateApp/updateNewsletter");
const updateMedias = require("./updateApp/updateMedias");
const deletePage = require("./pages/deletePage");
const updatePage = require("./pages/updatePage");
// const initLogo = require("../../middleware/app/initLogo");

// one liner
const logoWare = [requireUser, validateAdmin, getAppWithAppId, uploadSingle("logo"), saveAsset];
const initAppWare = [requireUser, requireAppName, requireUniqueName, uploadSingle("logo")];
const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
const heroWare = [...adminWare, uploadSingle("hero")];
const multiHeroWare = [...adminWare, uploadFields()];

// load app data
router.get("/app-list", getAppList);
router.get("/:appName", requireUser, getAppWithName);
// router.get("/latest/:appId", requireUser, latest);
router.get("/:appName/locale/:locale", requireUser, getAppWithLanguage);
// build app data
router.post("/init-app", initAppWare, saveAsset, initApp, minAppData);
// update app
router.post("/update-newsletter/:appId", heroWare, saveAsset, updateNewsletter, minAppData);
router.post("/update-medias/:appId", heroWare, saveAsset, updateMedias, minAppData);
router.post("/update-app-name/:appId", logoWare, updateAppLogo, minAppData);
router.post("/update-landing-page/:appId", multiHeroWare, updateLandingPage, minAppData);
router.post("/update-page/:appId/page/:pageId", multiHeroWare, updatePage, minAppData);
// building pages
router.post("/add-page/:appId", multiHeroWare, addPage, minAppData);
// delete app
router.delete("/delete-app/:appId", adminWare, deleteApp, minAppData);
// delete page
router.delete("/delete-page/:appId/page/:pageId", adminWare, deletePage, minAppData);

module.exports = router;
