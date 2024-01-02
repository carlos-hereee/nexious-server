import router  from "express".Router();
import { requireApp }  from "../../middleware/app";
import saveAsset  from "../../middleware/app/saveAsset";
import { requireUser }  from "../../middleware/auth";
import addPage  from "./pages/addPage";
import deleteApp  from "./deleteApp";
import initApp  from "./initApp";
import getAppWithName  from "./getApp/getAppWithName";
import updateLandingPage  from "./updateApp/landingPage";
import validateAdmin  from "../../middleware/app/validateAdmin";
import uploadSingle  from "../../utils/multer/uploadSingle";
import updateAppLogo  from "./updateApp/appLogo";
import requireUniqueName  from "../../middleware/app/requireUniqueName";
import getAppList  from "./getApp/appList";
import requireAppName  from "../../middleware/app/requireAppName";
import minAppData  from "./getApp/minAppData";
import getAppWithAppId  from "../../middleware/app/getAppWithAppId";
import getAppWithLanguage  from "./getApp/getAppWithLanguage";
import uploadFields  from "../../utils/multer/uploadFields";
import updateNewsletter  from "./updateApp/updateNewsletter";
import deletePage  from "./pages/deletePage";
import updatePage  from "./pages/updatePage";
import requirePage  from "../../middleware/pages/requirePage";
// media
import updateMedias  from "./media/updateMedias";
import addMedia  from "./media/addMedia";
import removeMedia  from "./media/removeMedia.";
import subscribe  from "./updateApp/subscribe";
import unsubscribe  from "./updateApp/unsubscribe";
import userData  from "../../middleware/auth/userData";
import saveFieldAssets  from "../../middleware/app/saveFieldAssets";
import updateAppDetails  from "./updateApp/updateAppDetails";

// one liner
const logoWare = [requireUser, validateAdmin, getAppWithAppId, uploadSingle("logo"), saveAsset];
const initAppWare = [requireUser, uploadSingle("logo"), requireAppName, requireUniqueName];
const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
const userWare = [requireUser, getAppWithAppId, requireApp];
const heroWare = [...adminWare, uploadSingle("hero")];
const multiHeroWare = [...adminWare, uploadFields(), saveFieldAssets];

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
router.post("/update-landing-page/:appId", multiHeroWare, updateLandingPage, minAppData);
router.post("/update-app-name/:appId", logoWare, updateAppLogo, minAppData);
router.post("/update-page/:appId/page/:pageId", multiHeroWare, requirePage, updatePage, minAppData);
router.put("/update-app-details/:appId", logoWare, updateAppDetails, minAppData);
// building pages
router.post("/add-page/:appId", multiHeroWare, addPage, minAppData);
router.post("/add-media/:appId", adminWare, addMedia, minAppData);
// delete app
router.delete("/delete-app/:appId", adminWare, deleteApp, minAppData);
router.delete("/delete-page/:appId/page/:pageId", adminWare, deletePage, minAppData);
router.delete("/delete-media/:appId/media/:assetId", adminWare, removeMedia, minAppData);

module.exports = router;
