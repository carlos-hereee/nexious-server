import router from "express";
import { saveAsset } from "../../middleware/app/saveAsset";
import { validateAdmin } from "../../middleware/app/validateAdmin";
import { addPage } from "./pages/addPage";
import { deleteApp } from "./deleteApp";
import { initApp } from "./initApp";
import { getAppWithName } from "./getApp/getAppWithName";
import { updateLandingPage } from "./updateApp/landingPage";
import { updateAppLogo } from "./updateApp/appLogo";
import { requireUniqueName } from "../../middleware/app/requireUniqueName";
import { getAppList } from "./getApp/appList";
import { requireAppName } from "../../middleware/app/requireAppName";
import { minAppData } from "./getApp/minAppData";
import { getAppWithAppId } from "../../middleware/app/getAppWithAppId";
import { getAppWithLanguage } from "./getApp/getAppWithLanguage";
import { updateNewsletter } from "./updateApp/updateNewsletter";
// import { deletePage } from "./pages/deletePage";
// import { updatePage } from "./pages/updatePage";
// import { requirePage } from "../../middleware/pages/requirePage";
// media
import { updateMedias } from "./media/updateMedias";
import { addMedia } from "./media/addMedia";
import { removeMedia } from "./media/removeMedia.";
import { subscribe } from "./updateApp/subscribe";
import { unsubscribe } from "./updateApp/unsubscribe";
import { userData } from "@authWare/userData";
import { saveFieldAssets } from "../../middleware/app/saveFieldAssets";
import { updateAppDetails } from "./updateApp/updateAppDetails";
import { uploadSingle, uploadFields } from "@aws/multer";
import { requireUser } from "@authWare/requireUser";
import { requireApp } from "middleware/app/requireApp";

// one liner
const logoWare = [requireUser, validateAdmin, getAppWithAppId, uploadSingle("logo"), saveAsset];
const initAppWare = [requireUser, uploadSingle("logo"), requireAppName, requireUniqueName];
const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
const userWare = [requireUser, getAppWithAppId, requireApp];
const heroWare = [...adminWare, uploadSingle("hero")];
const multiHeroWare = [...adminWare, uploadFields(), saveFieldAssets];

const route = router.Router();
// load app data
route.get("/app-list", getAppList);
route.get("/:appName", getAppWithName);
// route.get("/latest/:appId", requireUser, latest);
route.get("/:appName/locale/:locale", requireUser, getAppWithLanguage);
// build app data
route.post("/init-app", initAppWare, saveAsset, initApp, minAppData);
// user subscrition
route.post("/subscribe/:appId", userWare, subscribe, userData);
route.post("/unsubscribe/:appId", userWare, unsubscribe, userData);
// update app
route.post("/update-newsletter/:appId", heroWare, saveAsset, updateNewsletter, minAppData);
route.post("/update-medias/:appId", heroWare, saveAsset, updateMedias, minAppData);
route.post("/update-landing-page/:appId", multiHeroWare, updateLandingPage, minAppData);
route.post("/update-app-name/:appId", logoWare, updateAppLogo, minAppData);
// route.post("/update-page/:appId/page/:pageId", multiHeroWare, requirePage, updatePage, minAppData);
route.put("/update-app-details/:appId", logoWare, updateAppDetails, minAppData);
// building pages
route.post("/add-page/:appId", multiHeroWare, addPage, minAppData);
route.post("/add-media/:appId", adminWare, addMedia, minAppData);
// delete app
route.delete("/delete-app/:appId", adminWare, deleteApp, minAppData);
// route.delete("/delete-page/:appId/page/:pageId", adminWare, deletePage, minAppData);
route.delete("/delete-media/:appId/media/:assetId", adminWare, removeMedia, minAppData);

export default route;
