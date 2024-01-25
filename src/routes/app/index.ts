import router from "express";
import { requireApp } from "../../middleware/app.js";
import { saveAsset } from "../../middleware/app/saveAsset.js";
import { requireUser } from "../.@authWare.js";
import { validateAdmin } from "../../middleware/app/validateAdmin.js";
import { addPage } from "./pages/addPage.js";
import { deleteApp } from "./deleteApp.js";
import { initApp } from "./initApp.js";
import { getAppWithName } from "./getApp/getAppWithName.js";
import { updateLandingPage } from "./updateApp/landingPage.js";
import { updateAppLogo } from "./updateApp/appLogo.js";
import { requireUniqueName } from "../../middleware/app/requireUniqueName.js";
import { getAppList } from "./getApp/appList.js";
import { requireAppName } from "../../middleware/app/requireAppName.js";
import { minAppData } from "./getApp/minAppData.js";
import { getAppWithAppId } from "../../middleware/app/getAppWithAppId.js";
import { getAppWithLanguage } from "./getApp/getAppWithLanguage.js";
import { updateNewsletter } from "./updateApp/updateNewsletter.js";
// import { deletePage } from "./pages/deletePage";
// import { updatePage } from "./pages/updatePage";
// import { requirePage } from "../../middleware/pages/requirePage";
// media
import { updateMedias } from "./media/updateMedias.js";
import { addMedia } from "./media/addMedia.js";
import { removeMedia } from "./media/removeMedia..js";
import { subscribe } from "./updateApp/subscribe.js";
import { unsubscribe } from "./updateApp/unsubscribe.js";
import { userData } from "@authWare/userData.js";
import { saveFieldAssets } from "../../middleware/app/saveFieldAssets.js";
import { updateAppDetails } from "./updateApp/updateAppDetails.js";
import { uploadSingle, uploadFields } from "@aws/multer.js";

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
