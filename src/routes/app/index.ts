/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { Router } from "express";
import { saveAsset } from "@middleware/app/saveAsset";
import { deleteApp } from "./deleteApp";
import { initApp } from "./initApp";
import { getAppWithName } from "./getApp/getAppWithName";
import { getAppList } from "./getApp/appList";
import { minAppData } from "./getApp/minAppData";
import { getAppWithLanguage } from "./getApp/getAppWithLanguage";
import { updateNewsletter } from "./updateApp/updateNewsletter";

// media
import { addMedia } from "./media/addMedia";
import { removeMedia } from "./media/removeMedia.";
import { subscribe } from "./updateApp/subscribe";
import { updateAppDetails } from "./updateApp/updateAppDetails";
import {
  adminWare,
  heroWare,
  initAppWare,
  landingPageWare,
  logoWare,
  multiHeroWare,
  pageWare,
  userAppWare,
} from "@middleware/app";
import { updateLandingPage } from "./updateApp/landingPage";
import { addPage } from "./pages/addPage";
import { fetchPage } from "./pages/fetchPage";
import { updatePage } from "./pages/updatePage";
import { minUserData } from "./minUserData";
import { deletePage } from "./pages/deletePage";
import { deleteMenuItem } from "./deleteMenuItem";
import { latest } from "./updateApp/latest";

const route = Router();
// load app data
route.get("/app-list", getAppList);
route.get("/:appName", getAppWithName);
route.get("/:appName/locale/:locale", getAppWithLanguage);
route.get("/page/:pageId", fetchPage);
// build app data
route.post("/init-app", initAppWare, saveAsset, initApp, minAppData);
route.post("/latest/:appId", adminWare, latest, minAppData);
// user subscrition
route.post("/subscribe/:appId", userAppWare, subscribe, minUserData);
// update app
route.post("/update-newsletter/:appId", heroWare, updateNewsletter, minAppData);
// route.post("/update-medias/:appId", heroWare, updateMedias, minAppData);
route.put("/update-landing-page/:appId", multiHeroWare, landingPageWare, updateLandingPage, minAppData);
route.put("/update-page/:appId/page/:pageId", multiHeroWare, pageWare, updatePage, minAppData);
route.put("/update-app-details/:appId", logoWare, updateAppDetails, minAppData);
// building pages
route.post("/add-page/:appId", multiHeroWare, addPage, minAppData);
// add social media
route.post("/add-media/:appId", adminWare, addMedia, minAppData);
// delete app
route.delete("/delete-app/:appId", adminWare, deleteApp, minAppData);
route.delete("/delete-page/:appId/page/:pageId", adminWare, pageWare, deletePage, minAppData);
route.delete("/:appId/menu/:menuId", adminWare, deleteMenuItem, minAppData);
route.delete("/delete-media/:appId/media/:assetId", adminWare, removeMedia, minAppData);

export default route;
