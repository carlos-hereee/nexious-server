import { requireUser } from "@middleware/auth/requireUser";
import { uploadFields, uploadSingle } from "@utils/aws/multer";
import { saveAsset } from "../assets/saveAsset";
import { saveFieldAssets } from "../assets/saveFieldAssets";
import { aquireAppLanding } from "./aquireAppLanding";
import { aquireAppPage } from "./aquireAppPage";
import { getAppWithAppId } from "./getAppWithAppId";
import { requireApp } from "./requireApp";
import { requireAppName } from "./requireAppName";
import { requireMessage } from "./requireMessage";
import { requirePage } from "./requirePage";
import { requirePost } from "./requirePost";
import { requireUniqueName } from "./requireUniqueName";
import { validateAdmin } from "./validateAdmin";

export const adminWare = [requireUser, getAppWithAppId, requireApp, validateAdmin];
export const appAdminWare = [requireApp, validateAdmin];
export const appWare = [requireUser, getAppWithAppId];
export const heroWare = [...adminWare, uploadSingle("hero"), saveAsset];
export const logoWare = [...adminWare, getAppWithAppId, uploadSingle("logo"), saveAsset];
export const initAppWare = [requireUser, uploadSingle("logo"), requireAppName, requireUniqueName];
export const userAppWare = [requireUser, getAppWithAppId, requireApp];
export const multiHeroWare = [
  ...adminWare,
  uploadFields([
    { name: "hero", maxCount: 1 },
    { name: "sectionHero", maxCount: 10 },
  ]),
  saveFieldAssets,
];
export const pageWare = [aquireAppPage, requirePage];
export const landingPageWare = [aquireAppLanding, requirePage];
export const postWare = [requireUser, requirePost];
export const messageWare = [requireUser, requireMessage];
