/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { Router } from "express";
import { saveAsset } from "@middleware/app/saveAsset";
import { deleteApp } from "./deleteApp";
import { initApp } from "./initApp";
import { getAppWithName } from "./getApp/getAppWithName";
import { updateAppLogo } from "./updateApp/appLogo";
import { getAppList } from "./getApp/appList";
import { minAppData } from "./getApp/minAppData";
import { getAppWithLanguage } from "./getApp/getAppWithLanguage";
import { updateNewsletter } from "./updateApp/updateNewsletter";

// media
import { addMedia } from "./media/addMedia";
import { removeMedia } from "./media/removeMedia.";
import { subscribe } from "./updateApp/subscribe";
import { unsubscribe } from "./updateApp/unsubscribe";
import { updateAppDetails } from "./updateApp/updateAppDetails";
import { adminWare, heroWare, initAppWare, logoWare, multiHeroWare, userAppWare } from "@middleware/app";
import { updateLandingPage } from "./updateApp/landingPage";

const route = Router();
// load app data
route.get("/app-list", getAppList);
route.get("/:appName", getAppWithName);
route.get("/:appName/locale/:locale", getAppWithLanguage);
// build app data
route.post("/init-app", initAppWare, saveAsset, initApp, minAppData);
// user subscrition
route.post("/subscribe/:appId", userAppWare, subscribe);
route.post("/unsubscribe/:appId", userAppWare, unsubscribe);
// update app
route.post("/update-newsletter/:appId", heroWare, updateNewsletter, minAppData);
// route.post("/update-medias/:appId", heroWare, updateMedias, minAppData);
route.post("/update-landing-page/:appId", multiHeroWare, updateLandingPage, minAppData);
route.post("/update-app-name/:appId", logoWare, updateAppLogo, minAppData);
// route.post("/update-page/:appId/page/:pageId", multiHeroWare, requirePage, updatePage, minAppData);
route.put("/update-app-details/:appId", logoWare, updateAppDetails, minAppData);
// building pages
// route.post("/add-page/:appId", multiHeroWare, addPage, minAppData);
route.post("/add-media/:appId", adminWare, addMedia, minAppData);
// delete app
route.delete("/delete-app/:appId", adminWare, deleteApp, minAppData);
// route.delete("/delete-page/:appId/page/:pageId", adminWare, deletePage, minAppData);
route.delete("/delete-media/:appId/media/:assetId", adminWare, removeMedia, minAppData);

export default route;
