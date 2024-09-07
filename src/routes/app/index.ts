/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { Router } from "express";
import { saveAsset } from "@middleware/app/saveAsset";
import { deleteApp } from "./admin/deleteApp";
import { initApp } from "./admin/initApp";
import { getAppWithName } from "./getApp/getAppWithName";
import { minAppData } from "../minAppData";
import { getAppWithLanguage } from "./getApp/getAppWithLanguage";
import { updateNewsletter } from "./updateApp/updateNewsletter";

// media
import { addMedia } from "./media/addMedia";
import { removeMedia } from "./media/removeMedia.";
import { subscribe } from "./updateApp/subscribe";
import { updateAppDetails } from "./updateApp/updateAppDetails";
import {
  adminWare,
  appWare,
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
import { deletePage } from "./pages/deletePage";
import { deleteMenuItem } from "./admin/deleteMenuItem";
import { latest } from "./updateApp/latest";
import { deleteNotification } from "./updateApp/deleteNotification";
import { createSubscription } from "./admin/createSubscription";
import { editSubscription } from "./editSubscription";
import { deleteSubscription } from "./admin/deleteSubscription";
import { getPlatformData } from "@routes/getPlatformData";
import { editPlatformSub } from "./editPlatformSubscription";
import { getAppUserData } from "./getApp/getAppUserData";
import { updateMedias } from "./media/updateMedias";
import { updateMenuItem } from "./updateApp/updateMenuItem";
import { sendMessage } from "./contact/sendMessage";
import { sendPlatformMessage } from "./contact/sendPlatformMessage";
import { buildMap } from "./map/buildMap";
import { editMap } from "./map/editMap";
import taskBoardRoute from "./tasks";

const route = Router();

// task board
route.use("/:appId/task-board/", appWare, taskBoardRoute, minAppData);

// load app data
route.get("/platform-data", getPlatformData);
route.get("/:appName", getAppWithName);
route.get("/:appId/user-data", getAppUserData);
route.get("/:appName/locale/:locale", getAppWithLanguage);
route.get("/page/:pageId", fetchPage);
// contact app
route.post("/platform/contact", appWare, sendPlatformMessage, minAppData);
route.post("/:appId/contact", appWare, sendMessage, minAppData);
// build app data
route.post("/init-app", initAppWare, saveAsset, initApp, minAppData);
route.post("/:appId/build-map", appWare, buildMap, minAppData);
route.post("/latest/:appId", adminWare, latest, minAppData);
// manage subscritions
route.post("/create-subscription/:appId", appWare, createSubscription, minAppData);
route.post("/update-newsletter/:appId", heroWare, updateNewsletter, minAppData);
// update subscription
route.put("/update-subscription/platform/:subscriptionId", appWare, editPlatformSub, minAppData);
route.put("/update-subscription/:appId/:subscriptionId", appWare, editSubscription, minAppData);
// delete subscription
route.delete("/delete-subscription/:appId/:subscriptionId", appWare, deleteSubscription, minAppData);
// user accounts
route.put("/subscribe/:appId", userAppWare, subscribe);
// update app
route.put("/:appId/update-map", adminWare, editMap, minAppData);
route.put("/update-medias/:appId", appWare, updateMedias, minAppData);
route.put("/update-landing-page/:appId", multiHeroWare, landingPageWare, updateLandingPage, minAppData);
route.put("/update-page/:appId/page/:pageId", multiHeroWare, pageWare, updatePage, minAppData);
route.put("/:appId/menu/:menuId", adminWare, updateMenuItem, minAppData);
route.put("/update-app-details/:appId", logoWare, updateAppDetails, minAppData);
// building pages
route.post("/add-page/:appId", multiHeroWare, addPage, minAppData);

// add social media
route.post("/add-media/:appId", adminWare, addMedia, minAppData);
// delete app
route.delete("/delete-app/:appId", adminWare, deleteApp, minAppData);
route.delete("/delete-page/:appId/page/:pageId", adminWare, pageWare, deletePage, minAppData);
route.delete("/:appId/menu/:menuId", adminWare, deleteMenuItem, minAppData);
route.delete("/:appId/remove-notification/:notificationId", adminWare, deleteNotification, minAppData);
route.delete("/delete-media/:appId/media/:assetId", adminWare, removeMedia, minAppData);

export default route;
